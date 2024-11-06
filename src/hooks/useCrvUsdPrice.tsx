"use client"
import { CRVUSD_ORACLE } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits, parseAbi } from "viem";
import { mainnet } from "viem/chains";
import { readContract } from "wagmi/actions";

export const CRV_USD_PRICE_QUERY = "crvusd-price";

export const useCrvUsdPrice = () => {

    return useQuery({
        queryKey: [CRV_USD_PRICE_QUERY],
        queryFn: async () => {
            const result = await readContract(config, {
                abi: parseAbi(['function last_price() external view returns(uint256)']),
                address: CRVUSD_ORACLE,
                functionName: 'last_price',
                chainId: mainnet.id
            })

            return parseFloat(formatUnits(result, 18));
        },
    });
}