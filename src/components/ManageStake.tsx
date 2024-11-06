import { useState } from "react";
import { StakeCrvUsd } from "./StakeCrvUsd";
import { ReceiveSCrvUsd } from "./ReceiveSCrvUsd";
import { MaxDepositReached } from "./MaxDepositReached";
import { ApproveCrvUSD } from "./ApproveCrvUSD";
import { DepositCrvUSD } from "./DepositCrvUSD";

export const ManageStake = () => {
    const [deposit, setDeposit] = useState<string>('0');

    return <div className="flex flex-col space-y-3 items-center sm:items-start box-deposit rounded-lg min-w-80 sm:min-w-96 text-black">
        <StakeCrvUsd value={deposit} handleValue={setDeposit} />

        <div
            className="flex w-full justify-center items-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="styled__ArrowDownIcon-sc-1ch9xvh-2 lnxRYU"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
        </div>

        <ReceiveSCrvUsd deposit={deposit} />

        <MaxDepositReached deposit={deposit} />

        <ApproveCrvUSD deposit={deposit} />
        <DepositCrvUSD deposit={deposit} />
    </div>
}