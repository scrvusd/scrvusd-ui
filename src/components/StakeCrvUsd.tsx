import { useCrvUsdBalance } from "@/hooks/useCrvUsdBalance";
import { useCrvUsdPrice } from "@/hooks/useCrvUsdPrice";
import { CRV_USD_IMAGE } from "@/lib/images";
import { formatUsd } from "@/lib/number";

export interface IStakeCrvUsd {
    value: string;
    handleValue: (value: string) => void;
}

export const StakeCrvUsd = ({ value, handleValue }: IStakeCrvUsd) => {
    const crvUsdBalance = useCrvUsdBalance();
    const crvUsdPriceQuery = useCrvUsdPrice();

    // Prices
    const crvUsdPrice = crvUsdPriceQuery.data ? crvUsdPriceQuery.data : 1;

    // USD Balances
    const crvUsdBalanceUsdFormatted = formatUsd(crvUsdPrice * parseFloat(crvUsdBalance.data || '0'));

    // Balances
    const crvUsdBalanceFormatted = crvUsdBalance.data ? formatUsd(crvUsdBalance.data) : '0';

    return <div className="w-full space-y-2">
        <div className="flex flex-col rounded w-full space-y-2">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row justify-center items-center space-x-2">
                    <img
                        className="w-5 h-5"
                        src={CRV_USD_IMAGE}
                    />
                    <p>crvUSD</p>
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
                        onClick={() => handleValue(crvUsdBalance.data || '0')}
                    >
                        Max
                    </button>
                </div>
            </div>
            <div
                className="flex flex-row justify-between items-center w-full text-sm cursor-pointer"
                onClick={() => handleValue(crvUsdBalance.data || '0')}
            >
                <p>Balance: {crvUsdBalanceFormatted} crvUSD</p>
                <p>≈ ${crvUsdBalanceUsdFormatted}</p>
            </div>
        </div>
    </div>
}