"use client"
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem";
import { readContract } from "wagmi/actions";
import { scrvusdAbi } from "@/abis/scrvusd";
import { mainnet } from "viem/chains";

export const CRV_USD_STAKED_QUERY = "crvusd-staked";

export const useCrvUsdStaked = () => {

    return useQuery({
        queryKey: [CRV_USD_STAKED_QUERY],
        queryFn: async () => {

            const result = await readContract(config, {
                abi: scrvusdAbi,
                address: SCRV_USD,
                functionName: 'totalAssets',
                args: [],
                chainId: mainnet.id
            })

            return parseFloat(formatUnits(result, 18));
        }
    });
}