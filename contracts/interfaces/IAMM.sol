// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;
pragma abicoder v2;

interface IAMM {
    function swapExactAmountIn(
        uint256 _pairID,
        uint256 _tokenIn,
        uint256 _tokenAmountIn,
        uint256 _tokenOut,
        uint256 _minAmountOut,
        address _to
    ) external returns (uint256 tokenAmountOut, uint256 spotPriceAfter);

    /*
    function addLiquidity(
        uint256 _pairID,
        uint256 _poolAmountOut,
        uint256[2] calldata _maxAmountsIn
    ) external;

    function removeLiquidity(
        uint256 _pairID,
        uint256 _poolAmountIn,
        uint256[2] calldata _minAmountsOut
    ) external;
    */

    function getFYTAddress() external view returns (address);

    function getPTAddress() external view returns (address);

    /**
     * @notice Getter for the spot price of a pair
     * @param _pairID the id of the pair
     * @param _tokenIn the id of the tokens sent
     * @param _tokenOut the id of the tokens received
     * @return the sport price of the pair
     */
    function getSpotPrice(
        uint256 _pairID,
        uint256 _tokenIn,
        uint256 _tokenOut
    ) external view returns (uint256);
}
