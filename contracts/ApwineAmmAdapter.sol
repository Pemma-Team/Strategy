// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;

import { IAMM } from "./interfaces/IAMM.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ICreditManager {
    function provideCreditAccountAllowance(
        address,
        address,
        address
    ) external;

    function getCreditAccountOrRevert(address) external returns (address);

    function executeOrder(
        address,
        address,
        bytes calldata
    ) external returns (bytes memory);
}

interface ICreditFilter {
    function checkMultiTokenCollateral(
        address,
        uint256,
        uint256,
        address,
        address
    ) external;
}

contract ApwineAmmAdapter is IAMM {
    ICreditManager public immutable creditManager;
    ICreditFilter public immutable creditFilter;
    address public immutable amm;
    address public immutable token0;
    address public immutable token1;

    constructor(
        address _creditManager,
        address _creditFilter,
        address _amm,
        address _token0,
        address _token1
    ) {
        creditManager = ICreditManager(_creditManager);
        creditFilter = ICreditFilter(_creditFilter);
        amm = _amm;
        token0 = _token0;
        token1 = _token1;
    }

    function getPTAddress() external view override returns (address) {
        return IAMM(amm).getPTAddress();
    }

    function getFYTAddress() external view override returns (address) {
        return IAMM(amm).getFYTAddress();
    }

    function getSpotPrice(
        uint256 _pairID,
        uint256 _tokenIn,
        uint256 _tokenOut
    ) external view override returns (uint256) {
        return IAMM(amm).getSpotPrice(_pairID, _tokenIn, _tokenOut);
    }

    function swapExactAmountIn(
        uint256 _pairID,
        uint256 _tokenIn,
        uint256 _tokenAmountIn,
        uint256 _tokenOut,
        uint256 _minAmountOut,
        address _to
    ) external override returns (uint256 tokenAmountOut, uint256 spotPriceAfter) {
        address creditAccount = creditManager.getCreditAccountOrRevert(msg.sender);

        creditManager.provideCreditAccountAllowance(creditAccount, amm, token0);
        creditManager.provideCreditAccountAllowance(creditAccount, amm, token1);

        bytes memory data = abi.encodeWithSelector(
            IAMM.swapExactAmountIn.selector,
            _pairID,
            _tokenIn,
            _tokenAmountIn,
            _tokenOut,
            _minAmountOut,
            _to
        );

        (tokenAmountOut, spotPriceAfter) = abi.decode(
            creditManager.executeOrder(msg.sender, amm, data),
            (uint256, uint256)
        );

        creditFilter.checkMultiTokenCollateral(
            creditAccount,
            _tokenAmountIn,
            IERC20(token1).balanceOf(address(this)), // TBD this part is probably incorrect
            token0,
            token1
        );
    }
}
