"use client"
import { CRV_USD, REWARDS_HANDLER } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { erc20Abi, formatUnits } from "viem";
import { mainnet } from "viem/chains";
import { readContract } from "wagmi/actions";

export const CRV_USD_REWARD_HANDLER_BALANCE_QUERY = "crvusd-reward-handler-balance";

export const useCrvUsdBalanceRewardsHandler = () => {

    return useQuery({
        queryKey: [CRV_USD_REWARD_HANDLER_BALANCE_QUERY],
        queryFn: async () => {
            const result = await readContract(config, {
                abi: erc20Abi,
                address: CRV_USD,
                functionName: 'balanceOf',
                args: [REWARDS_HANDLER],
                chainId: mainnet.id
            })

            return parseFloat(formatUnits(result, 18));
        }
    });
}