import { parseAbi } from "viem";

export const feeSplitterAbi = parseAbi([
    'function n_receivers() external view returns(uint256)',
    'function receivers(uint256 i) external view returns((address,uint256))',
])