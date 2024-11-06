import { useCrvUsdPrice } from "@/hooks/useCrvUsdPrice";
import { formatUsd } from "@/lib/number";
import { IStakeCrvUsd } from "./StakeCrvUsd";
import { useSCrvUsdBalance } from "@/hooks/useSCrvUsdBalance";
import { useSCrvUsdPricePerShare } from "@/hooks/useSCrvUsdPricePerShare";
import { SCRV_USD_IMAGE } from "@/lib/images";

export const UnstakeSCrvUsd = ({ value, handleValue }: IStakeCrvUsd) => {
    const scrvUsdBalance = useSCrvUsdBalance();
    const pricePerShareQuery = useSCrvUsdPricePerShare()
    const crvUsdPriceQuery = useCrvUsdPrice();

    // Prices
    const pricePerShare = pricePerShareQuery.data || 1;
    const crvUsdPrice = crvUsdPriceQuery.data ? crvUsdPriceQuery.data : 1;
    const scrvusdPrice = crvUsdPrice * pricePerShare;

    // USD Balances
    const scrvUsdBalanceUsdFormatted = formatUsd(scrvusdPrice * parseFloat(scrvUsdBalance.data || '0'));

    // Balances
    const scrvUsdBalanceFormatted = scrvUsdBalance.data ? formatUsd(scrvUsdBalance.data) : '0';

    return <div className="w-full space-y-2">
        <div className="flex flex-col rounded w-full space-y-2">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row justify-center items-center space-x-2">
                    <img
                        className="w-5 h-5"
                        src={SCRV_USD_IMAGE}
                    />
                    <p>scrvUSD</p>
                </div>

                <div className="flex flex-row justify-center items-center space-x-1">
                    <input
                        className="rounded p-1 outline-none h-full w-[100px] sm:w-full"
                        type="text"
                        value={value === '0' ? '' : value}
                        pattern="^[0-9]*[.]?[0-9]*$"
                        inputMode="decimal"
                        placeholder="0"
                        onChange={(e) => {
                            if (/^[0-9]*[.]?[0-9]*$/.test(e.target.value)) {
                                handleValue(e.target.value.length === 0 ? "0" : e.target.value);
                            }
                        }}
                    />
                    <button
                        className="text-sm max-button p-1 rounded h-full"
                        onClick={() => handleValue(scrvUsdBalance.data || '0')}
                    >
                        Max
                    </button>
                </div>
            </div>
            <div
                className="flex flex-row justify-between items-center w-full text-sm cursor-pointer"
                onClick={() => handleValue(scrvUsdBalance.data || '0')}
            >
                <p>Balance: {scrvUsdBalanceFormatted} scrvUSD</p>
                <p>≈ ${scrvUsdBalanceUsdFormatted}</p>
            </div>
        </div>
    </div>
}