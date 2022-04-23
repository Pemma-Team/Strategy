// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IPool } from "@aave/core-v3/contracts/interfaces/IPool.sol";
import { IUniswapV2Router02 } from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface IStrategy {
    function invest() external;
    function checker() external view returns (bool canExec, bytes memory execPayload);
}

contract Strategy is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    IERC20 public immutable farmToken;
    IPool public immutable aave;
    IUniswapV2Router02 public immutable uniRouter;
    uint8 public leverage;

    error Invalid_Leverage_Value();

    constructor(address _token, address _farmToken, address _pool, address _uniRouter, uint8 _leverage) {
        token = IERC20(_token);
        farmToken = IERC20(_farmToken);
        aave = IPool(_pool);
        uniRouter = IUniswapV2Router02(_uniRouter);
        leverage = _leverage;

        token.safeApprove(address(aave), type(uint256).max);
        farmToken.safeApprove(address(uniRouter), type(uint256).max);
    }

    function setLeverage(uint8 _leverage) external onlyOwner {
        if(_leverage < 1 || _leverage > 5) revert Invalid_Leverage_Value();
        leverage = _leverage;
    }

    function invest() external {
        uint256 farmTokenBalance = farmToken.balanceOf(address(this));
        if( farmTokenBalance > 0) _swap(farmTokenBalance, address(farmToken), address(token));

        uint256 tokenBalance = token.balanceOf(address(this));
        // TBD take leverage on Gearbox
        uint256 amount = leverage * tokenBalance;
        
        aave.deposit(address(token), amount, address(this), 0);
    }

    function checker() external view returns (bool canExec, bytes memory execPayload) {
        execPayload = abi.encodeWithSelector(
			IStrategy.invest.selector,
			address(this)
		);
        
        if(tx.gasprice < 100 gwei && (farmToken.balanceOf(address(this)) > 0 || token.balanceOf(address(this)) > 0) ) canExec = true;
        else canExec = false;
    }

    function _swap(uint256 amount, address from, address to) internal {
        address[] memory path = new address[](2);
        path[0] = from;
        path[1] = to;

        uint256[] memory amountsOut = uniRouter.getAmountsOut(amount, path);

        uniRouter.swapExactTokensForTokens(
            amount,
            amountsOut[1],
            path,
            address(this),
            block.timestamp + 5 minutes
        );
    }
}
