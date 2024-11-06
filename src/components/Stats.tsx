import { useCrvUsdCirculatingSupply } from "@/hooks/useCrvUsdCirculatingSupply";
import { useCrvUsdPrice } from "@/hooks/useCrvUsdPrice";
import { useCrvUsdStaked } from "@/hooks/useCrvUsdStaked";
import { usePegKeepersProfits } from "@/hooks/usePegKeepersProfits";
import { useRangeFee } from "@/hooks/useRangeFee";
import { useSCrvUsdPricePerShare } from "@/hooks/useSCrvUsdPricePerShare"
import { useStrategyReported } from "@/hooks/useStrategyReported";
import { fixed, formatUsd } from "@/lib/number";
import { useMemo } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export const Stats = () => {

    const pricePerShareQuery = useSCrvUsdPricePerShare();
    const crvUsdStakedQuery = useCrvUsdStaked();
    const rangeFeesQuery = useRangeFee();
    const pegkeeperProfitsQuery = usePegKeepersProfits();
    const crvUSDCirculatingSupplyQuery = useCrvUsdCirculatingSupply();
    const totalProfitsReported = useStrategyReported();
    const crvUsdPriceQuery = useCrvUsdPrice();

    const pricePerShare = useMemo(() => !pricePerShareQuery.data ? '-' : fixed((pricePerShareQuery.data || 1).toString(), 8), [pricePerShareQuery.data]);
    const crvUsdStaked = useMemo(() => !crvUsdStakedQuery.data ? '-' : formatUsd(crvUsdStakedQuery.data || 1), [crvUsdStakedQuery.data]);
    const pegkeeperProfits = useMemo(() => !pegkeeperProfitsQuery.data ? '-' : formatUsd(pegkeeperProfitsQuery.data || 0), [pegkeeperProfitsQuery.data]);
    const percentageStaked = useMemo(() => (crvUsdStakedQuery.data || 0) * 100 / parseFloat(crvUSDCirculatingSupplyQuery.data || '1'), [crvUSDCirculatingSupplyQuery.data, crvUsdStakedQuery.data]);

    const apr = useMemo(() => {
        const crvUsdStaked = crvUsdStakedQuery.data || 1;
        const crvUsdPrice = crvUsdPriceQuery.data || 1;
        const crvUsdStakedUSD = crvUsdStaked * crvUsdPrice;

        const totalProfitsReportedYearlyUSD = totalProfitsReported * crvUsdPrice * 52;

        return totalProfitsReportedYearlyUSD * 100 / crvUsdStakedUSD;
    }, [totalProfitsReported, crvUsdStakedQuery.data, crvUsdPriceQuery.data]);

    return <div className="flex flex-col space-y-2 items-center sm:items-start box-deposit rounded-lg p-2 text-black w-[180px] divide-y divide-dashed divide-slate-300 min-h-full">
        <div className=" flex flex-col justify-center items-center rounded pt-2 w-full space-y-1">
            <p className="text-sm">APR</p>
            <p className="font-bold text-black">{fixed(apr.toString(), 2)}%</p>
        </div>
        <div className=" flex flex-col justify-center items-center rounded pt-2 w-full space-y-1">
            <p className="text-sm">Price per share</p>
            <p className="font-bold text-black">${pricePerShare}</p>
        </div>
        <div className="flex flex-col justify-center items-center rounded pb-2 pt-2 w-full space-y-1">
            <p className="text-sm">crvUSD staked</p>

            <div className="flex flex-row space-x-2 justify-center items-center">
                <p className="font-bold text-black">{crvUsdStaked} crvUSD</p>
                <a href="https://etherscan.io/address/0x0655977feb2f289a4ab78af67bab0d17aab84367" target="_blank">
                    <FaExternalLinkAlt size={10} />
                </a>
            </div>

            <div className="flex flex-row space-x-2 justify-center items-center">
                <p className="text-xs text-black">({fixed(percentageStaked.toString(), 4)}% of the supply)</p>
                <a href="https://etherscan.io/address/0xe24e2db9f6bb40bbe7c1c025bc87104f5401ecd7#code" target="_blank">
                    <FaExternalLinkAlt size={10} />
                </a>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center rounded pb-2 pt-2 w-full space-y-1">
            <p className="text-sm">Current weight</p>
            <p className="font-bold text-black">{rangeFeesQuery.data?.currentWeight ? `${rangeFeesQuery.data?.currentWeight}%` : '-'}</p>
        </div>
        <div className="flex flex-col justify-center items-center rounded pb-2 pt-2 w-full space-y-1">
            <div className="flex flex-row space-x-2 justify-center items-center">
                <p className="text-sm">Range weight</p>
                <a href="https://curvemonitor.com/dao/proposal/ownership/875" target="_blank">
                    <FaExternalLinkAlt size={10} />
                </a>
            </div>

            <div className="flex flex-row justify-center items-center font-bold space-x-2">
                <p>{rangeFeesQuery.data?.minWeight ? `${rangeFeesQuery.data?.minWeight}%` : '-'}</p>
                <p>-</p>
                <p>{rangeFeesQuery.data?.maxWeight && rangeFeesQuery.data?.maxWeight !== -1 ? `${rangeFeesQuery.data?.maxWeight}%` : '10%'}</p>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center rounded pb-2 pt-2 w-full space-y-1">
            <p className="text-sm">Current crvUSD fees</p>
            <p className="font-bold text-black">${pegkeeperProfits}</p>
        </div>
    </div>
}