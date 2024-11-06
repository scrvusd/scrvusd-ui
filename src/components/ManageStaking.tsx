import { useState } from "react";
import { ManageStake } from "./ManageStake";
import { ManageUnstake } from "./ManageUnstake";
import { FaExternalLinkAlt } from "react-icons/fa";

export const ManageStaking = () => {
    const [isStake, setStake] = useState<boolean>(true);

    return <div className="flex flex-col space-y-4 items-center sm:items-start box-deposit rounded-lg sm:p-5 min-w-45 sm:min-w-96 text-black min-h-full">
        <div className="flex flex-row justify-center items-center space-x-4">
            <p
                className={`cursor-pointer ${isStake ? "font-bold underline" : ""}`}
                onClick={() => setStake(true)}
            >
                Stake
            </p>
            <p
                className={`cursor-pointer ${!isStake ? "font-bold underline" : ""}`}
                onClick={() => setStake(false)}
            >
                Unstake
            </p>
        </div>
        {
            isStake && <ManageStake />
        }
        {
            !isStake && <ManageUnstake />
        }

        <a
            href="https://etherscan.io/address/0x0655977feb2f289a4ab78af67bab0d17aab84367"
            target="_blank"
            className="text-sm text-center w-full max-w-[380px] flex flex-row justify-center items-center"
        >
            <p className="inline-block">Please note scrvusd.xyz only interacts with one contract. Please verify that your approval and deposit are on the scrvusd vault contract. You can verify the scrvusd vault contract here <span className="inline-block"> <FaExternalLinkAlt size={10} /></span>.</p>
        </a>
    </div>
}