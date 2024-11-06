"use client"
import { FEE_SPLITTER, REWARDS_HANDLER, STABLECOIN_LENS } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem";
import { readContract, readContracts } from "wagmi/actions";
import { mainnet } from "viem/chains";
import { feeSplitterAbi } from "@/abis/feeSplitter";
import { rewardsHandlerAbi } from "@/abis/rewardsHandler";
import { stableCoinLensAbi } from "@/abis/stablecoinLens";

export const CRV_USD_CIRCULATING_SUPPLY_QUERY = "crvusd-circulating-supply";

export const useCrvUsdCirculatingSupply = () => {

    return useQuery({
        queryKey: [CRV_USD_CIRCULATING_SUPPLY_QUERY],
        queryFn: async () => {

            const result = await readContract(config, {
                abi: stableCoinLensAbi,
                address: STABLECOIN_LENS,
                functionName: 'circulating_supply',
                args: [],
                chainId: mainnet.id,
            });

            return formatUnits(result, 18);
        }
    });
}