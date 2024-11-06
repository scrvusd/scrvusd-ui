import { parseAbi } from "viem";

export const crvUSDFactoryAbi = parseAbi([
    'function n_collaterals() external view returns(uint256)',
    'function controllers(uint256 i) external view returns(address)',
    'function monetary_policy(uint256 i) external view returns(address)',
])