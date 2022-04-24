// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;

import { IAave } from "./interfaces/IAave.sol";
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
    ) external;
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

contract AaveLendingPoolAdapter is IAave {
    ICreditManager public immutable creditManager;
    ICreditFilter public immutable creditFilter;
    address public immutable pool;
    address public immutable token0;
    address public immutable token1;

    constructor(
        address _creditManager,
        address _creditFilter,
        address _pool,
        address _token0,
        address _token1
    ) {
        creditManager = ICreditManager(_creditManager);
        creditFilter = ICreditFilter(_creditFilter);
        pool = _pool;
        token0 = _token0;
        token1 = _token1;
    }

    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external override {
        address creditAccount = creditManager.getCreditAccountOrRevert(msg.sender);

        creditManager.provideCreditAccountAllowance(creditAccount, pool, token0);
        creditManager.provideCreditAccountAllowance(creditAccount, pool, token1);

        bytes memory data = abi.encodeWithSelector(IAave.deposit.selector, asset, amount, onBehalfOf, referralCode);

        creditManager.executeOrder(msg.sender, pool, data);

        creditFilter.checkMultiTokenCollateral(
            creditAccount,
            amount,
            IERC20(token0).balanceOf(address(this)),
            token0,
            token1
        );
    }
}
