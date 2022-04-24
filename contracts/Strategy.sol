// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import { IUniswapV2Router02 } from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IStrategy } from "./interfaces/IStrategy.sol";
import { IAave } from "./interfaces/IAave.sol";
import { IController } from "./interfaces/IController.sol";
import { IAMM } from "./interfaces/IAMM.sol";

import "hardhat/console.sol";

/**
 * @notice This strategy allows to buy a future on any supported token with leverage
 */
contract Strategy is IStrategy, Ownable {
    using SafeERC20 for IERC20;

    // the token the vault is using
    IERC20 public immutable token;

    // internal constants
    IERC20 private immutable farmToken;
    IERC20 private immutable ptoken;
    IERC20 private immutable fytoken;
    IAave private immutable aave; // use AaveLendingPoolAdapter
    IUniswapV2Router02 private immutable uniRouter;
    IController private immutable controller; // use ApwineControllerAdapter
    IAMM private immutable amm; // use ApwineAmmAdapter
    address private immutable futureVault;
    uint256 private immutable pairID;
    uint8 private leverage;

    error Invalid_Leverage_Value();
    error Balance_Error();
    error Allowance_Error();

    constructor(
        address _token,
        address _farmToken,
        address _aavePool,
        address _uniRouter,
        address _controller,
        address _amm,
        address _futureVault,
        uint256 _pairID,
        uint8 _leverage
    ) {
        // Init vars
        token = IERC20(_token);
        farmToken = IERC20(_farmToken);
        aave = IAave(_aavePool);
        uniRouter = IUniswapV2Router02(_uniRouter);
        controller = IController(_controller);
        amm = IAMM(_amm);
        futureVault = _futureVault;
        pairID = _pairID;
        leverage = _leverage;

        // get PToken and FYToken addresses from the AMM
        ptoken = IERC20(amm.getPTAddress());
        fytoken = IERC20(amm.getFYTAddress());

        // token transfer approves
        token.safeApprove(_aavePool, type(uint256).max);
        farmToken.safeApprove(_uniRouter, type(uint256).max);
        ptoken.safeApprove(_amm, type(uint256).max);
        fytoken.safeApprove(_amm, type(uint256).max);
    }

    function setLeverage(uint8 _leverage) external onlyOwner {
        if (_leverage < 1 || _leverage > 10) revert Invalid_Leverage_Value();
        leverage = _leverage;
    }

    function invest(IERC20 inputToken, uint256 amount) external override {
        if (inputToken.balanceOf(msg.sender) < amount) revert Balance_Error();
        if (inputToken.allowance(msg.sender, address(this)) < amount) revert Allowance_Error();

        token.safeTransferFrom(msg.sender, address(this), amount);
        inputToken.safeApprove(address(uniRouter), type(uint256).max);
        _swap(amount, address(inputToken), address(token));
        execute();
    }

    function execute() public override {
        // Step 0 - swap farmed APW tokens for the wanted token
        uint256 farmTokenBalance = farmToken.balanceOf(address(this));
        if (farmTokenBalance > 0) _swap(farmTokenBalance, address(farmToken), address(token));

        // Step 1 - take leverage on Gearbox
        uint256 tokenBalance = token.balanceOf(address(this));
        uint256 amount = leverage * tokenBalance;
        // TBD

        // Step 2 - deposit wanted token on Aave
        aave.deposit(address(token), amount, address(this), 0);

        // Step 3 - deposit aTokens on Apwine
        controller.deposit(futureVault, amount);

        // Step 4 - swap PTokens for the underlying wanted tokens
        uint256 ptokenBalance = ptoken.balanceOf(address(this));
        (uint256 amountOut, ) = amm.swapExactAmountIn(
            pairID,
            0, // TBD this should be the ptoken token ID
            ptokenBalance,
            1, // TBD this should be the fytoken token ID
            amm.getSpotPrice(pairID, 0, 1) * ptokenBalance, // TBD check math, 0 (ptoken) and 1 (fytoken) should be repaced with tokenIDs
            address(this)
        );

        // Step 5 - repay Gearbox loan

        // Step 6 - add FYTokens as collateral to the internal Apwine AMM
        //amm.addLiquidity();
    }

    function checker() external view override returns (bool canExec, bytes memory execPayload) {
        execPayload = abi.encodeWithSelector(IStrategy.invest.selector, address(this));

        if (tx.gasprice < 100 gwei && (farmToken.balanceOf(address(this)) > 0 || token.balanceOf(address(this)) > 0))
            canExec = true;
        else canExec = false;
    }

    function _swap(
        uint256 amount,
        address from,
        address to
    ) internal {
        address[] memory path = new address[](2);
        path[0] = from;
        path[1] = to;

        uint256[] memory amountsOut = uniRouter.getAmountsOut(amount, path);

        uniRouter.swapExactTokensForTokens(amount, amountsOut[1], path, address(this), block.timestamp + 5 minutes);
    }
}
