import { parseAbi } from "viem";

export const rewardsHandlerAbi = parseAbi([
    'function minimum_weight() external view returns(uint256)',
    'function weight() external view returns(uint256)',
])