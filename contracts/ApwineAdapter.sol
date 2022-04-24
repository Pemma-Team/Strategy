// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;

import { IController } from "./interfaces/IController.sol";
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

contract ApwineControllerAdapter is IController {
    ICreditManager public immutable creditManager;
    ICreditFilter public immutable creditFilter;
    address public immutable controller;
    address public immutable token0;
    address public immutable token1;

    constructor(
        address _creditManager,
        address _creditFilter,
        address _controller,
        address _token0,
        address _token1
    ) {
        creditManager = ICreditManager(_creditManager);
        creditFilter = ICreditFilter(_creditFilter);
        controller = _controller;
        token0 = _token0;
        token1 = _token1;
    }

    function deposit(address _futureVault, uint256 _amount) external override {
        address creditAccount = creditManager.getCreditAccountOrRevert(msg.sender);

        creditManager.provideCreditAccountAllowance(creditAccount, controller, token0);

        creditManager.provideCreditAccountAllowance(creditAccount, controller, token1);

        bytes memory data = abi.encodeWithSelector(IController.deposit.selector, _futureVault, _amount);

        creditManager.executeOrder(msg.sender, controller, data);

        creditFilter.checkMultiTokenCollateral(
            creditAccount,
            _amount,
            IERC20(token0).balanceOf(address(this)) + IERC20(token1).balanceOf(address(this)), // TBD this part is probably incorrect
            token0,
            token1
        );
    }
}
