"use client"
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem";
import { readContract } from "wagmi/actions";
import { useAccount } from "wagmi";
import { scrvusdAbi } from "@/abis/scrvusd";
import { mainnet } from "viem/chains";

export const SCRV_USD_MAX_DEPOSIT_QUERY = "scrvusd-max-deposit";

export const useMaxDeposit = () => {
    const { address, isConnected } = useAccount();

    return useQuery({
        queryKey: [SCRV_USD_MAX_DEPOSIT_QUERY],
        queryFn: async () => {
            if (!address) {
                return '0'
            }

            const result = await readContract(config, {
                abi: scrvusdAbi,
                address: SCRV_USD,
                functionName: 'maxDeposit',
                args: [address],
                chainId: mainnet.id
            })

            return formatUnits(result, 18);
        },
        enabled: isConnected
    });
}