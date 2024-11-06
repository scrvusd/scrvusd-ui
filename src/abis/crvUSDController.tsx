import { parseAbi } from "viem";

export const crvUSDControllerAbi = parseAbi([
    'function monetary_policy() external view returns(address)',
    'function admin_fees() external view returns(uint256)',
])