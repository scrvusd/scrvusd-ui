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
        <div className="flex flex-col justify-start items-start space-y-1">
        <div
                className="text-sm  w-full max-w-[380px] flex flex-col justify-start items-start space-y-1"
            >
                <p className="inline-block text-center">
                    Please note that by depositing on scrvusd.xyz, you are interacting with multiple contracts.
                </p>

                <div className="">
                    <span>Contracts can be verified: </span>
                    <a
                        href="https://etherscan.io/address/0x0655977feb2f289a4ab78af67bab0d17aab84367"
                        target="_blank"
                        className="text-sm mr-1"
                    >
                        <span>scrvusd vault <span className="inline-block"> <FaExternalLinkAlt size={10} /></span></span>
                    </a>
                    <a
                        href="https://etherscan.io/address/0x0655977feb2f289a4ab78af67bab0d17aab84367"
                        target="_blank"
                        className="text-sm"
                    >
                        <span>depositor <span className="inline-block"> <FaExternalLinkAlt size={10} /></span></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
}