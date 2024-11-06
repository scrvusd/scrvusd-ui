'use client'

import { RPC } from '@/config/rpc'
import { getDefaultConfig } from 'connectkit'
import { createPublicClient } from 'viem'
import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const walletConnectProjectId = '0'

export const clients = {
  [mainnet.id]: createPublicClient({ chain: mainnet, transport: http(RPC[mainnet.id]) }),
}

const connectKitConfig = getDefaultConfig({
  // Your dApps chains
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(RPC[mainnet.id]),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,

  // Required API Keys
  walletConnectProjectId,

  // Required App Info
  appName: 'scrvUSD',

  // Optional App Info
  appDescription: 'scrvUSD',
  appUrl: 'https://scrvusd.xyz',
  appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
})

export const config = createConfig(connectKitConfig)
