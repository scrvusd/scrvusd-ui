import { scrvusdAbi } from "@/abis/scrvusd";
import { useCrvUsdAllowanceDepositor } from "@/hooks/useCrvUsdAllowanceDepositor";
import { useCrvUsdBalance } from "@/hooks/useCrvUsdBalance";
import { useMaxDeposit } from "@/hooks/useMaxDeposit";
import { DEPOSITOR, SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { parseEther } from "viem";
import { mainnet } from "viem/chains";
import { useAccount, useWriteContract } from "wagmi";
import { switchChain } from "wagmi/actions";

interface IDepositCrvUSD {
    deposit: string;
}

export const DepositCrvUSD = ({ deposit }: IDepositCrvUSD) => {
    const queryClient = useQueryClient();
    const { chainId, address } = useAccount();
    const crvUsdBalanceQuery = useCrvUsdBalance();
    const allowanceCrvUsdQuery = useCrvUsdAllowanceDepositor();
    const maxDepositQuery = useMaxDeposit();

    const { isSuccess: isDepositSuccess, writeContract: depositWrite } = useWriteContract();

    useEffect(() => {
        if (isDepositSuccess) {
            queryClient.invalidateQueries({ queryKey: [] })
        }
    }, [isDepositSuccess]);

    const stake = async () => {
        if (!address) {
            return;
        }

        if (chainId !== mainnet.id) {
            await switchChain(config, { chainId: mainnet.id });
        }

        depositWrite({
            address: DEPOSITOR,
            abi: scrvusdAbi,
            functionName: 'deposit',
            args: [parseEther(deposit), address],
            chainId: mainnet.id,
        });
    }

    const crvUsdBalance = useMemo(() => {
        return parseFloat(crvUsdBalanceQuery.data || '0');
    }, [crvUsdBalanceQuery.data]);

    const allowance = useMemo(() => {
        return parseFloat(allowanceCrvUsdQuery.data || '0');
    }, [allowanceCrvUsdQuery.data]);

    const maxDeposit = useMemo(() => {
        return parseFloat(maxDepositQuery.data || '0');
    }, [maxDepositQuery.data]);

    const isDisable = useMemo(() => {
        const depositNumber = parseFloat(deposit);
        return allowance < depositNumber || depositNumber > crvUsdBalance || depositNumber > maxDeposit || deposit === '0';
    }, [allowance, deposit, maxDeposit, crvUsdBalance]);

    return <button
        className={`text-sm rounded w-full p-2 flex justify-center items-center mt-5 ${isDisable ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-black text-white'} `}
        disabled={isDisable}
        onClick={stake}
    >
        Stake
    </button>
}