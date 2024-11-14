"use client"

import { ConnectKitButton } from "connectkit"

export const Menu = () => {
    return <>
        <div className="hidden md:flex flex-row justify-between items-center w-full pt-5 pl-20 pr-20 text-white">
            <p className="font-bold">
                <svg width="97" height="16" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="0" cy="100" r="90" fill="white" />
                    <circle cx="300" cy="100" r="90" fill="#ffc300" />
                    <circle cx="600" cy="100" r="90" fill="#FF3200" />
                </svg>
            </p>
            <div className="bg-yellow-400 p-2 rounded text-yellow-800 text-sm">
                <p>Disclaimer: Please use scrvusd.xyz at your own risk.</p>
            </div>
            <div className="font-sans">
                <ConnectKitButton />
            </div>
        </div>

        <div className="flex md:hidden flex-col space-y-2 w-full">
            <div className="flex flex-row justify-between items-center w-full pt-2 text-white">
                <p className="font-bold">
                    <svg width="97" height="16" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="0" cy="100" r="90" fill="white" />
                        <circle cx="300" cy="100" r="90" fill="#ffc300" />
                        <circle cx="600" cy="100" r="90" fill="#FF3200" />
                    </svg>
                </p>
                <div className="font-sans mr-4">
                    <ConnectKitButton />
                </div>
            </div>

            <div className="bg-yellow-400 p-2 rounded text-yellow-800 text-sm text-center">
                <p>Disclaimer: Currently there is no UI available from Curve Finance for savings crvUSD. Please use scrvusd.xyz at your own risk.</p>
            </div>

        </div>
    </>
}