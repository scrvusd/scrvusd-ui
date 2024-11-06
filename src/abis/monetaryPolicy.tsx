import { parseAbi } from "viem";

export const monetaryPolicyAbi = parseAbi([
    'function peg_keepers(uint256 i) external view returns(address)',
])