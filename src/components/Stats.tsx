import { WEEK } from "@/config/time";
import { useCrvUsdBalanceRewardsHandler } from "@/hooks/useCrvUsdBalanceRewardsHandler";
import { useCrvUsdCirculatingSupply } from "@/hooks/useCrvUsdCirculatingSupply";
import { useCrvUsdPrice } from "@/hooks/useCrvUsdPrice";
import { useCrvUsdStaked } from "@/hooks/useCrvUsdStaked";
import { useCrvUSDControllerProfits } from "@/hooks/usePegKeepersProfits";
import { useRangeFee } from "@/hooks/useRangeFee";
import { useSCrvUsdPricePerShare } from "@/hooks/useSCrvUsdPricePerShare"
import { useStrategyReported } from "@/hooks/useStrategyReported";
import { fixed, formatUsd } from "@/lib/number";
import moment from "moment";
import { useMemo } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export const Stats = () => {

    const pricePerShareQuery = useSCrvUsdPricePerShare();
    const crvUsdStakedQuery = useCrvUsdStaked();
    const rangeFeesQuery = useRangeFee();
    const controllerProfitsQuery = useCrvUSDControllerProfits();
    const crvUsdRewardHandlerQuery = useCrvUsdBalanceRewardsHandler();
    const crvUSDCirculatingSupplyQuery = useCrvUsdCirculatingSupply();
    const strategyReportedData = useStrategyReported();
    const crvUsdPriceQuery = useCrvUsdPrice();

    const pricePerShare = useMemo(() => !pricePerShareQuery.data ? '-' : fixed((pricePerShareQuery.data || 1).toString(), 8), [pricePerShareQuery.data]);
    const crvUsdStaked = useMemo(() => !crvUsdStakedQuery.data ? '-' : formatUsd(crvUsdStakedQuery.data || 1), [crvUsdStakedQuery.data]);
    const percentageStaked = useMemo(() => (crvUsdStakedQuery.data || 0) * 100 / parseFloat(crvUSDCirculatingSupplyQuery.data || '1'), [crvUSDCirculatingSupplyQuery.data, crvUsdStakedQuery.data]);

    // Next distribution
    const nextDistribution = useMemo(() => {
        if (!rangeFeesQuery.data || !controllerProfitsQuery.data || crvUsdRewardHandlerQuery.data === undefined) {
            return 0
        }

        return (rangeFeesQuery.data.currentWeight * controllerProfitsQuery.data / 100) + crvUsdRewardHandlerQuery.data;
    }, [controllerProfitsQuery.data, rangeFeesQuery.data, crvUsdRewardHandlerQuery.data]);

    const crvUsdStakedUSD = useMemo(() => {
        const crvUsdStaked = crvUsdStakedQuery.data || 1;
        const crvUsdPrice = crvUsdPriceQuery.data || 1;
        return crvUsdStaked * crvUsdPrice;
    }, [crvUsdStakedQuery.data, crvUsdPriceQuery.data]);

    const apr = useMemo(() => {
        if (strategyReportedData.timeSinceLastDistribution === 0 ||
            strategyReportedData.timeSinceLastDistribution >= WEEK
            || crvUsdStakedUSD === 0) {
            return 0;
        }

        const crvUsdPrice = crvUsdPriceQuery.data || 1;
        const totalProfitsReportedYearlyUSD = strategyReportedData.gain * crvUsdPrice * 52;

        return totalProfitsReportedYearlyUSD * 100 / crvUsdStakedUSD;
    }, [strategyReportedData, crvUsdStakedUSD, crvUsdPriceQuery.data]);

    const projectedApr = useMemo(() => {
        if (crvUsdStakedUSD === 0 || strategyReportedData.timeSinceLastDistribution === 0) {
            return 0
        }
        const dollarPerSec = nextDistribution / strategyReportedData.timeSinceLastDistribution;
        const earnings = dollarPerSec * WEEK * 52;
        return earnings * 100 / crvUsdStakedUSD;
    }, [strategyReportedData, nextDistribution, crvUsdStakedUSD]);

    const lastDistributionDate = useMemo(() => strategyReportedData.lastDistributionTimestamp === 0 ? '-' : moment.unix(strategyReportedData.lastDistributionTimestamp).utc().format("LL") ,[strategyReportedData]);

    return <div className="flex flex-col space-y-2 items-center sm:items-start box-deposit rounded-lg p-2 text-black w-[180px] divide-y divide-dashed divide-slate-300 min-h-full">
        <div className=" flex flex-col justify-center items-center rounded pt-2 w-full space-y-1">
            <p className="text-sm">APR</p>
            <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-black">{apr === 0 ? "-" : `${fixed(apr.toString(), 2)}%`}</p>
                <p className="text-xs font-medium text-black">(proj {projectedApr === 0 ? '-' : `${fixed(projectedApr.toString(), 2)}%`})</p>
            </div>
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
            <p className="text-sm text-center">Last crvUSD fee distribution</p>
            <div className="flex flex-row space-x-2 justify-center items-center">
                <p className="font-bold text-black">${fixed(strategyReportedData.gain.toString(), 2)}</p>
                {
                    strategyReportedData.transactionHash && <a href={`https://etherscan.io/tx/${strategyReportedData.transactionHash}`} target="_blank">
                        <FaExternalLinkAlt size={10} />
                    </a>
                }
            </div>
            <p className="text-xs font-medium text-black">({lastDistributionDate})</p>
        </div>
        <div className="flex flex-col justify-center items-center rounded pb-2 pt-2 w-full space-y-1">
            <p className="text-sm text-center">Future distribution estimate</p>
            <p className="font-bold text-black">{formatUsd(nextDistribution)} crvUSD</p>
        </div>
    </div>
}