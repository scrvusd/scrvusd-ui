import { scrvusdAbi } from "@/abis/scrvusd";
import { useSCrvUsdBalance } from "@/hooks/useSCrvUsdBalance";
import { SCRV_USD } from "@/lib/contracts";
import { config } from "@/lib/web3";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { parseEther } from "viem";
import { mainnet } from "viem/chains";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { switchChain } from "wagmi/actions";

interface IWithdrawSCrvUsd {
    value: string;
}

export const WithdrawSCrvUsd = ({ value }: IWithdrawSCrvUsd) => {
    const queryClient = useQueryClient();
    const { chainId, address, isConnected } = useAccount();
    const scrvUsdBalanceQuery = useSCrvUsdBalance();

    const { data: hash, writeContract: withdrawWrite } = useWriteContract();
    const { isSuccess: isWithdrawSuccess  } = useWaitForTransactionReceipt({hash});

    useEffect(() => {
        if (isWithdrawSuccess) {
            queryClient.invalidateQueries({ queryKey: [] })
        }
    }, [isWithdrawSuccess]);

    const unstake = async () => {
        if (!address) {
            return;
        }

        if (chainId !== mainnet.id) {
            await switchChain(config, { chainId: mainnet.id });
        }

        withdrawWrite({
            address: SCRV_USD,
            abi: scrvusdAbi,
            functionName: 'redeem',
            args: [parseEther(value), address, address],
            chainId: mainnet.id,
        });
    }

    const scrvUsdBalance = useMemo(() => {
        return parseFloat(scrvUsdBalanceQuery.data || '0');
    }, [scrvUsdBalanceQuery.data]);

    const isDisable = useMemo(() => {
        return parseFloat(value) > scrvUsdBalance || value === '0' || !isConnected;
    }, [value, scrvUsdBalance]);

    return <button
        className={`text-sm rounded w-full p-2 flex justify-center items-center mt-5 ${isDisable ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-black text-white'} `}
        disabled={isDisable}
        onClick={unstake}
    >
        Unstake
    </button>
}