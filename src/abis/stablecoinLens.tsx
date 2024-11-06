import { parseAbi } from "viem";

export const stableCoinLensAbi = parseAbi([
    'function circulating_supply() external view returns(uint256)',
])