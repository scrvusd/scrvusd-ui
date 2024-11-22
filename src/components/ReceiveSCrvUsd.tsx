import { useCrvUsdPrice } from "@/hooks/useCrvUsdPrice";
import { useDepositorFee } from "@/hooks/useDepositorFee";
import { usePreviewDeposit } from "@/hooks/usePreviewDeposit";
import { useSCrvUsdBalance } from "@/hooks/useSCrvUsdBalance";
import { useSCrvUsdPricePerShare } from "@/hooks/useSCrvUsdPricePerShare";
import { SCRV_USD_IMAGE } from "@/lib/images";
import { fixed, formatUsd } from "@/lib/number";
import { Tooltip } from "@mui/material";
import { CiCircleInfo } from "react-icons/ci";

interface IReceiveSCrvUsd {
    deposit: string;
}

export const ReceiveSCrvUsd = ({ deposit }: IReceiveSCrvUsd) => {
    const scrvUsdBalance = useSCrvUsdBalance();
    const crvUsdPriceQuery = useCrvUsdPrice();
    const scrvUsdPricePerShareQuery = useSCrvUsdPricePerShare();
    const previewDepositQuery = usePreviewDeposit(deposit)
    const depositorFeeQuery = useDepositorFee();

    // Prices
    const crvUsdPrice = crvUsdPriceQuery.data ? crvUsdPriceQuery.data : 1;
    const scrvUsdPricePerShare = scrvUsdPricePerShareQuery.data ? scrvUsdPricePerShareQuery.data : 1;
    const scrvUsdPrice = scrvUsdPricePerShare * crvUsdPrice;

    // Balances
    const scrvUsdBalanceUsdFormatted = formatUsd(scrvUsdPrice * parseFloat(scrvUsdBalance.data || '0'));
    const scrvUsdBalanceFormatted = scrvUsdBalance.data ? formatUsd(scrvUsdBalance.data) : '0';

    return <div className="w-full space-y-2">
        <p className="font-medium underline">Receive</p>
        <div className="flex flex-col rounded w-full space-y-2">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row justify-center items-center space-x-2">
                    <img
                        className="w-5 h-5"
                        src={SCRV_USD_IMAGE}
                    />
                    <p>scrvUSD</p>
                </div>
                <div className="flex flex-row jsutify-center items-center space-x-2">
                    <p>{formatUsd(previewDepositQuery.data || '0')}</p>
                    {
                        depositorFeeQuery.data !== undefined && <Tooltip
                            title={<div className="flex flex-col space-y-1">
                                Minus {fixed((depositorFeeQuery.data*100).toString(), 2)}% fee
                            </div>}
                            aria-label="add">
                            <p><CiCircleInfo className="cursor-pointer" size={15} /></p>
                        </Tooltip>
                    }

                </div>

            </div>
            <div className="flex flex-row justify-between items-center w-full text-sm">
                <p>Balance: {scrvUsdBalanceFormatted} scrvUSD</p>
                <p>≈ ${scrvUsdBalanceUsdFormatted}</p>
            </div>
        </div>
    </div>;
}