"use client"
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits, parseEther } from "viem";
import { readContract } from "wagmi/actions";
import { scrvusdAbi } from "@/abis/scrvusd";
import { mainnet } from "viem/chains";
import { useDepositorFee } from "./useDepositorFee";

export const SCRV_USD_PREVIEW_DEPOSIT_QUERY = "scrvusd-preview-deposit";

export const usePreviewDeposit = (deposit: string) => {
    const depositorFeeQuery = useDepositorFee();

    return useQuery({
        queryKey: [SCRV_USD_PREVIEW_DEPOSIT_QUERY, deposit, depositorFeeQuery.data],
        queryFn: async () => {

            const resultPreview = await readContract(config, {
                abi: scrvusdAbi,
                address: SCRV_USD,
                functionName: 'previewDeposit',
                args: [parseEther(deposit)],
                chainId: mainnet.id
            });

            const preview = parseFloat(formatUnits(resultPreview, 18));
            const fee = depositorFeeQuery.data || 0;

            return (preview - (preview * fee)).toString();
        },
        enabled: depositorFeeQuery.data !== undefined
    });
}