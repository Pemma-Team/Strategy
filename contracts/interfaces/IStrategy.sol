// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IStrategy {
    function invest(IERC20 inputToken, uint256 amount) external;

    function execute() external;

    function checker() external view returns (bool canExec, bytes memory execPayload);
}
