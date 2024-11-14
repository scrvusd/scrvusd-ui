"use client"
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { erc20Abi, formatUnits } from "viem";
import { readContract } from "wagmi/actions";
import { mainnet } from "viem/chains";

export const SCRV_TOTAL_SUPPLT_QUERY = "scrvusd-total-supply";

export const useSCrvUsdTotalSupply = () => {

    return useQuery({
        queryKey: [SCRV_TOTAL_SUPPLT_QUERY],
        queryFn: async () => {

            const result = await readContract(config, {
                abi: erc20Abi,
                address: SCRV_USD,
                functionName: 'totalSupply',
                args: [],
                chainId: mainnet.id
            })

            return parseFloat(formatUnits(result, 18));
        }
    });
}