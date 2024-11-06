import { SCRV_USD } from "@/lib/contracts"
import { mainnet } from "viem/chains"
import { useBlockNumber, usePublicClient } from "wagmi"
import { useEffect, useState } from "react"
import { formatUnits, parseAbiItem } from "viem"

export const useStrategyReported = () => {
    const publicClient = usePublicClient({ chainId: mainnet.id });
    const currentBlockNumber = useBlockNumber({ chainId: mainnet.id, watch: false });

    const [totalProfits, setTotalProfits] = useState<number>(0);

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

        if (!logs) {
            return;
        }

        for (const log of logs) {
            const gain = log.args[1];
            if (!gain) {
                continue;
            }

            setTotalProfits(parseFloat(formatUnits(gain, 18)));
        }
    }

    return totalProfits;
}