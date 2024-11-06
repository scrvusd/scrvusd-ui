
import { crvUSDControllerAbi } from "@/abis/crvUSDController";
import { crvUSDFactoryAbi } from "@/abis/crvUSDFactory";
import { monetaryPolicyAbi } from "@/abis/monetaryPolicy";
import { pegkeeperAbi } from "@/abis/pegkeeper";
import { CRVUSD_FACTORY } from "@/lib/contracts";
import { equals } from "@/lib/strings";
import { config } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query"
import { formatUnits, zeroAddress } from "viem";
import { mainnet } from "viem/chains";
import { multicall } from "wagmi/actions";

const PEGKEEPERS = "pegkeepers";

export const usePegKeepersProfits = () => {
    return useQuery({
        queryKey: [PEGKEEPERS],
        queryFn: async () => {
            const controllerAddresses = await getControllerAddresses();

            let calls: any[] = controllerAddresses.map((controllerAddress) => {
                return [
                    {
                        abi: crvUSDControllerAbi,
                        address: controllerAddress,
                        functionName: "admin_fees",
                        args: []
                    },
                ]
            }).flat();

            const responses = await multicall(config,
                {
                    contracts: calls,
                    chainId: mainnet.id,
                    allowFailure: true,
                });

            const profit = responses.reduce((acc: bigint, res) => {
                if (res.status === "success") {
                    return acc + (res.result as bigint);
                }

                return acc;
            }, BigInt(0));

            return parseFloat(formatUnits(profit, 18));
        },
    });
}

const getControllerAddresses = async (): Promise<`0x${string}`[]> => {
    const nbCollateralsResp = await multicall(config,
        {
            contracts: [
                {
                    abi: crvUSDFactoryAbi,
                    address: CRVUSD_FACTORY,
                    functionName: "n_collaterals",
                    args: []
                }
            ],
            chainId: mainnet.id,
        });

    const nbCollaterals = Number(nbCollateralsResp.shift()?.result as bigint);

    // Fetch controllers addresses
    let calls: any[] = [];

    for (let i = 0; i < nbCollaterals; i++) {
        calls.push({
            abi: crvUSDFactoryAbi,
            address: CRVUSD_FACTORY,
            functionName: "controllers",
            args: [BigInt(i)]
        });
    }

    const controllersAddressesResp = await multicall(config,
        {
            contracts: calls,
            chainId: mainnet.id,
        });

    return controllersAddressesResp.map((res) => res.result as `0x${string}`);
}