"use client"
import { rewardsHandlerAbi } from "@/abis/rewardsHandler";
import { REWARDS_HANDLER } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { mainnet } from "viem/chains";
import { readContract } from "wagmi/actions";

export const COMPUTE_TWA_QUERY = "compute-twa";

export const useComputeTwa = () => {

    return useQuery({
        queryKey: [COMPUTE_TWA_QUERY],
        queryFn: async () => {

            const result = await readContract(config, {
                abi: rewardsHandlerAbi,
                address: REWARDS_HANDLER,
                functionName: 'compute_twa',
                args: [],
                chainId: mainnet.id
            })

            return Number(result) / 100;
        }
    });
}