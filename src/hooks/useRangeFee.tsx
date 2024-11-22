"use client"
import { FEE_SPLITTER, REWARDS_HANDLER } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem";
import { readContracts } from "wagmi/actions";
import { mainnet } from "viem/chains";
import { feeSplitterAbi } from "@/abis/feeSplitter";
import { rewardsHandlerAbi } from "@/abis/rewardsHandler";

export const RANGE_FEE_QUERY = "range-fee";

export const useRangeFee = () => {

    return useQuery({
        queryKey: [RANGE_FEE_QUERY],
        queryFn: async () => {

            const results = await readContracts(config, {
                contracts: [
                    {
                        abi: feeSplitterAbi,
                        address: FEE_SPLITTER,
                        functionName: 'receivers',
                        args: [BigInt(0)],
                        chainId: mainnet.id,
                    },
                    {
                        abi: rewardsHandlerAbi,
                        address: REWARDS_HANDLER,
                        functionName: 'minimum_weight',
                        args: [],
                        chainId: mainnet.id,
                    },
                    {
                        abi: rewardsHandlerAbi,
                        address: REWARDS_HANDLER,
                        functionName: 'weight',
                        args: [],
                        chainId: mainnet.id,
                    }
                ],
                allowFailure: true
            });
            
            let maxWeight = -1;
            let minWeight = -1;
            let currentWeight = -1;

            let resp = results.shift();
            if(resp?.status === "success") {
                const receiverResp = resp.result as any;
                maxWeight = parseFloat(formatUnits(receiverResp[1] as bigint, 2));
            }

            resp = results.shift();
            if(resp?.status === "success") {
                minWeight = parseFloat(formatUnits(resp.result as bigint, 2));
            }

            resp = results.shift();
            if(resp?.status === "success") {
                currentWeight = parseFloat(formatUnits(resp.result as bigint, 2));
            }

            return {
                maxWeight,
                minWeight, 
                currentWeight
            }
        }
    });
}