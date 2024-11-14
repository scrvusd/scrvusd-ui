import { parseAbi } from "viem";

export const rewardsHandlerAbi = parseAbi([
    'function minimum_weight() external view returns(uint256)',
    'function weight() external view returns(uint256)',
    'function min_snapshot_dt_seconds() external view returns(uint256)',
    'function last_snapshot_timestamp() external view returns(uint256)',
    'function process_rewards() external',
    'function compute_twa() external view returns(uint256)',
])