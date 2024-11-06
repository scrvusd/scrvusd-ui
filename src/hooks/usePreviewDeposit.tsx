"use client"
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits, parseEther } from "viem";
import { readContract } from "wagmi/actions";
import { scrvusdAbi } from "@/abis/scrvusd";
import { mainnet } from "viem/chains";

export const SCRV_USD_PREVIEW_DEPOSIT_QUERY = "scrvusd-preview-deposit";

export const usePreviewDeposit = (deposit: string) => {

    return useQuery({
        queryKey: [SCRV_USD_PREVIEW_DEPOSIT_QUERY, deposit],
        queryFn: async () => {

            const result = await readContract(config, {
                abi: scrvusdAbi,
                address: SCRV_USD,
                functionName: 'previewDeposit',
                args: [parseEther(deposit)],
                chainId: mainnet.id
            })

            return formatUnits(result, 18);
        },
    });
}