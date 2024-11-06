"use client"
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem";
import { readContract } from "wagmi/actions";
import { scrvusdAbi } from "@/abis/scrvusd";
import { mainnet } from "viem/chains";

export const SCRV_USD_PRICE_PER_SHARE_QUERY = "scrvusd-price-per-share";

export const useSCrvUsdPricePerShare = () => {

    return useQuery({
        queryKey: [SCRV_USD_PRICE_PER_SHARE_QUERY],
        queryFn: async () => {

            const result = await readContract(config, {
                abi: scrvusdAbi,
                address: SCRV_USD,
                functionName: 'pricePerShare',
                args: [],
                chainId: mainnet.id
            })

            return parseFloat(formatUnits(result, 18));
        }
    });
}