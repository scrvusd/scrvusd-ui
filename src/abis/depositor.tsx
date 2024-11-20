import { parseAbi } from "viem";

export const depositorAbi = parseAbi([
    'function fee() external view returns(uint256)',
])