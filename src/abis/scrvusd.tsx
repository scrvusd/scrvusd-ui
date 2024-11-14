import { parseAbi } from "viem";

export const scrvusdAbi = parseAbi([
    'function maxDeposit(address receiver) external view returns(uint256)',
    'function previewDeposit(uint256 assets) external view returns(uint256)',
    'function previewWithdraw(uint256 assets) external view returns(uint256)',
    'function previewRedeem(uint256 assets) external view returns(uint256)',
    'function totalAssets() external view returns(uint256)',
    'function pricePerShare() external view returns(uint256)',
    'function deposit(uint256 assets, address receiver) external',
    'function withdraw(uint256 assets, address receiver, address owner) external',
    'function redeem(uint256 assets, address receiver, address owner) external',
    'function profitUnlockingRate() external view returns(uint256)',
])