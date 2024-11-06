import { parseAbi } from "viem";

export const pegkeeperAbi = parseAbi([
    'function calc_profit() external view returns(uint256)',
])