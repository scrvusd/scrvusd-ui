"use client"
import { CRV_USD, SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { erc20Abi, formatUnits } from "viem";
import { readContract } from "wagmi/actions";
import { useAccount } from "wagmi";
import { mainnet } from "viem/chains";

export const CRV_USD_ALLOWANCE_QUERY = "crvusd-allowance";

export const useCrvUsdAllowance = () => {
    const { address, isConnected } = useAccount();

    return useQuery({
        queryKey: [CRV_USD_ALLOWANCE_QUERY],
        queryFn: async () => {
            if (!address) {
                return '0'
            }

            const result = await readContract(config, {
                abi: erc20Abi,
                address: CRV_USD,
                functionName: 'allowance',
                args: [address, SCRV_USD],
                chainId: mainnet.id
            })

            return formatUnits(result, 18);
        },
        enabled: isConnected
    });
}