'use client'

import { config } from '@/lib/web3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { PropsWithChildren, useState } from 'react'
import { WagmiProvider } from 'wagmi'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const [c] = useState(() => config)
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={c}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          mode="light"
          customTheme={{
            '--ck-body-color': 'hsl(var(--primary))',
            '--ck-border-radius': '12px',
            '--ck-overlay-background': '#00000016',
            '--ck-overlay-backdrop-filter': 'blur(0px)',

            '--ck-primary-button-border-radius': 'var(--radius)',
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
