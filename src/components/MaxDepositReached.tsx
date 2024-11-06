import { useMaxDeposit } from "@/hooks/useMaxDeposit";
import { useMemo } from "react";
import { useAccount } from "wagmi";

interface IMaxDepositReached {
    deposit: string;
}

export const MaxDepositReached = ({ deposit }: IMaxDepositReached) => {
    const { isConnected } = useAccount();
    const maxDeposit = useMaxDeposit();

    const isMaxDepositReached = useMemo(() => {
        return parseFloat(deposit) > parseFloat(maxDeposit.data || '0');
    }, [maxDeposit.data, deposit]);

    if (!isMaxDepositReached || !isConnected) {
        return null;
    }

    return <div className="w-full space-y-2">
        <p className="text-sm w-full text-center text-red-700">Max deposit reached</p>
    </div>
}