import { useCrvUsdBalance } from "@/hooks/useCrvUsdBalance";
import { useCrvUsdPrice } from "@/hooks/useCrvUsdPrice";
import { usePreviewDeposit } from "@/hooks/usePreviewDeposit";
import { usePreviewWithdraw } from "@/hooks/usePreviewWithdraw";
import { useSCrvUsdBalance } from "@/hooks/useSCrvUsdBalance";
import { useSCrvUsdPricePerShare } from "@/hooks/useSCrvUsdPricePerShare";
import { CRV_USD_IMAGE } from "@/lib/images";
import { formatUsd } from "@/lib/number";

interface IReceiveCrvUsd {
    value: string;
}

export const ReceiveCrvUsd = ({ value }: IReceiveCrvUsd) => {
    const crvUsdBalance = useCrvUsdBalance();
    const crvUsdPriceQuery = useCrvUsdPrice();
    const previewWithdrawQuery = usePreviewWithdraw(value)

    // Prices
    const crvUsdPrice = crvUsdPriceQuery.data ? crvUsdPriceQuery.data : 1;

    // Balances
    const crvUsdBalanceUsdFormatted = formatUsd(crvUsdPrice * parseFloat(crvUsdBalance.data || '0'));
    const crvUsdBalanceFormatted = crvUsdBalance.data ? formatUsd(crvUsdBalance.data) : '0';

    return <div className="w-full space-y-2">
        <p className="font-medium underline">Receive</p>
        <div className="flex flex-col rounded w-full space-y-2">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row justify-center items-center space-x-2">
                    <img
                        className="w-5 h-5"
                        src={CRV_USD_IMAGE} 
                    />
                    <p>crvUSD</p>
                </div>
                <p>{formatUsd(previewWithdrawQuery.data || '0')}</p>
            </div>
            <div className="flex flex-row justify-between items-center w-full text-sm">
                <p>Balance: {crvUsdBalanceFormatted} crvUSD</p>
                <p>≈ ${crvUsdBalanceUsdFormatted}</p>
            </div>
        </div>
    </div>;
}