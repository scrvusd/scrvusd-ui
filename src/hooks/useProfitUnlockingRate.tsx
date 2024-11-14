"use client"
import { scrvusdAbi } from "@/abis/scrvusd";
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem";
import { mainnet } from "viem/chains";
import { readContract } from "wagmi/actions";

export const PROFIT_UNLOCKING_RATE_QUERY = "profit-unlocking-rate";

export const useProfitUnlockingRate = () => {

    return useQuery({
        queryKey: [PROFIT_UNLOCKING_RATE_QUERY],
        queryFn: async () => {

            const result = await readContract(config, {
                abi: scrvusdAbi,
                address: SCRV_USD,
                functionName: 'profitUnlockingRate',
                args: [],
                chainId: mainnet.id
            })

            return parseFloat(formatUnits(result, 18));
        }
    });
}