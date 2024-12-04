"use client"
import { depositorAbi } from "@/abis/depositor";
import { DEPOSITOR } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem";
import { mainnet } from "viem/chains";
import { readContract } from "wagmi/actions";

export const DEPOSITOR_FEE_QUERY = "depositor-fee";

export const useDepositorFee = () => {

    return useQuery({
        queryKey: [DEPOSITOR_FEE_QUERY],
        queryFn: async () => {
            const resultFee = await readContract(config, {
                abi: depositorAbi,
                address: DEPOSITOR,
                functionName: 'fee',
                args: [],
                chainId: mainnet.id
            });
            
            return 0
        }
    });
}