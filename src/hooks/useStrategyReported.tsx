import { SCRV_USD } from "@/lib/contracts"
import { mainnet } from "viem/chains"
import { useBlockNumber, usePublicClient } from "wagmi"
import { useEffect, useState } from "react"
import { formatUnits, parseAbiItem } from "viem"

interface IStrategyReported {
    gain: number;
    timeSinceLastDistribution: number;
    transactionHash: `0x${string}` | undefined;
    lastDistributionTimestamp : number;
    timeSincePreviousDistribution: number;
}

export const useStrategyReported = () => {
    const publicClient = usePublicClient({ chainId: mainnet.id });
    const currentBlockNumber = useBlockNumber({ chainId: mainnet.id, watch: false });

    const [totalProfits, setTotalProfits] = useState<IStrategyReported>({
        gain: 0,
        timeSinceLastDistribution: 0,
        transactionHash: undefined,
        lastDistributionTimestamp: 0,
        timeSincePreviousDistribution: 0,
    });

    useEffect(() => {
        fetchLogs();
    }, [currentBlockNumber.data, publicClient]);

    const fetchLogs = async () => {
        if (!currentBlockNumber.data) {
            return;
        }

        const logs = await publicClient?.getLogs({
            address: SCRV_USD,
            event: parseAbiItem("event StrategyReported(address indexed,uint256,uint256,uint256,uint256,uint256,uint256)"),
            fromBlock: currentBlockNumber.data - BigInt(216000)
        });

        if (!logs || logs.length === 0) {
            return;
        }

        const lastLog = logs[logs.length - 1];
        const gain = lastLog.args[1];
        if (!gain) {
            return;
        }

        const [block, previousBlock, currentBlock] = await Promise.all([
            publicClient?.getBlock({
                blockHash: lastLog.blockHash
            }),
            publicClient?.getBlock({
                blockHash: logs[logs.length - 2].blockHash
            }),
            publicClient?.getBlock()
        ])
        if (!block || !currentBlock || !previousBlock) {
            return;
        }

        const blockTimestamp = Number(block.timestamp);
        const previousBlockTimestamp = Number(previousBlock.timestamp);
        const currentBlockTimestamp = Number(currentBlock.timestamp);
        const timeSinceLastDistribution = currentBlockTimestamp - blockTimestamp;
        setTotalProfits({
            gain: parseFloat(formatUnits(gain, 18)),
            timeSinceLastDistribution,
            transactionHash: lastLog.transactionHash,
            lastDistributionTimestamp: blockTimestamp,
            timeSincePreviousDistribution: currentBlockTimestamp - previousBlockTimestamp
        });
    }

    return totalProfits;
}