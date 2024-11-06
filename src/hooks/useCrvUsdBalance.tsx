"use client"
import { CRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { erc20Abi, formatUnits } from "viem";
import { mainnet } from "viem/chains";
import { useAccount } from 'wagmi'
import { readContract } from "wagmi/actions";

export const CRV_USD_BALANCE_QUERY = "crvusd-balance";

export const useCrvUsdBalance = () => {
    const { address, isConnected } = useAccount();

    return useQuery({
        queryKey: [CRV_USD_BALANCE_QUERY, address],
        queryFn: async () => {
            if (!address) {
                return "0"
            }

            const result = await readContract(config, {
                abi: erc20Abi,
                address: CRV_USD,
                functionName: 'balanceOf',
                args: [address],
                chainId: mainnet.id
            })

            return formatUnits(result, 18);
        },
        enabled: isConnected
    });
}