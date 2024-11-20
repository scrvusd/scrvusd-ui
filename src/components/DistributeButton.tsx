import { config } from "@/lib/web3";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { switchChain } from "wagmi/actions";
import { mainnet } from "viem/chains";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { FEE_SPLITTER, MULTICALL_MAINNET, REWARDS_HANDLER } from "@/lib/contracts";
import { getControllerAddresses } from "@/hooks/usePegKeepersProfits";
import { encodeFunctionData } from 'viem';
import MulticallAbi from '../abis/multicallAbi.json';
import { feeSplitterAbi } from "@/abis/feeSplitter";
import { rewardsHandlerAbi } from "@/abis/rewardsHandler";

interface IDistributeButton {
    disable: boolean;
}

export const DistributeButton = ({ disable }: IDistributeButton) => {

    const queryClient = useQueryClient();
    const { chainId } = useAccount();

    const { data: hash, writeContract: distributeWriteContract } = useWriteContract();
    const { isSuccess: isDistributedSuccess  } = useWaitForTransactionReceipt({hash});

    useEffect(() => {
        if (isDistributedSuccess) {
            queryClient.invalidateQueries({ queryKey: [] })
        }
    }, [isDistributedSuccess]);

    const distribute = async () => {
        if (chainId !== mainnet.id) {
            await switchChain(config, { chainId: mainnet.id });
        }

        // Compute calldata
        const controllerAddresses = await getControllerAddresses();

        // Dispatch fees in the fee splitter
        const calldatas = [[FEE_SPLITTER, encodeFunctionData({
            abi: feeSplitterAbi,
            functionName: 'dispatch_fees',
            args: [controllerAddresses]
        })]];

        calldatas.push([REWARDS_HANDLER, encodeFunctionData({
            abi: rewardsHandlerAbi,
            functionName: 'process_rewards'
        })]);

        distributeWriteContract({
            address: MULTICALL_MAINNET,
            abi: MulticallAbi,
            functionName: 'aggregate',
            args: [calldatas],
            chainId: mainnet.id,
        });
    };

    return <button
        className={`text-sm rounded w-full p-1 flex justify-center items-center mt-5 ${disable ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-black text-white'} `}
        disabled={disable}
        onClick={distribute}
    >
        Distribute
    </button>
};