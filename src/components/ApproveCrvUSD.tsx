import { CRV_USD_ALLOWANCE_QUERY, useCrvUsdAllowance } from "@/hooks/useCrvUsdAllowance"
import { CRV_USD, SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { erc20Abi, maxUint256 } from "viem";
import { mainnet } from "viem/chains";
import { useAccount, useWriteContract } from "wagmi";
import { switchChain } from "wagmi/actions";

interface IApproveCrvUSD {
    deposit: string;
}

export const ApproveCrvUSD = ({ deposit }: IApproveCrvUSD) => {
    const { isConnected } = useAccount();
    const queryClient = useQueryClient();
    const { chainId } = useAccount();
    const allowanceCrvUsd = useCrvUsdAllowance();
    const { isSuccess: isApproveSuccess, writeContract: approveWriteContract } = useWriteContract();

    useEffect(() => {
        if (isApproveSuccess) {
            queryClient.invalidateQueries({ queryKey: [] })
        }
    }, [isApproveSuccess]);

    const approve = async () => {
        if (chainId !== mainnet.id) {
            await switchChain(config, { chainId: mainnet.id });
        }

        approveWriteContract({
            address: CRV_USD,
            abi: erc20Abi,
            functionName: 'approve',
            args: [SCRV_USD, maxUint256],
            chainId: mainnet.id,
        });
    }

    const allowance = useMemo(() => {
        return parseFloat(allowanceCrvUsd.data || '0');
    }, [allowanceCrvUsd.data]);

    const isDisable = useMemo(() => {
        return allowance > parseFloat(deposit) || deposit === '0' || !isConnected;
    }, [allowance, deposit]);

    const isApproved = useMemo(() => {
        return allowance >= parseFloat(deposit) && deposit !== '0'
    }, [allowance, deposit]);

    return <button
        className={`text-sm rounded w-full p-2 flex justify-center items-center mt-5 ${isDisable ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-black text-white'} `}
        disabled={isDisable}
        onClick={approve}
    >
        {isApproved ? 'Approved' : 'Approve'}
    </button>
}