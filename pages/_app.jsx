import '../styles/globals.css'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import {baseGoerli, base } from 'wagmi/chains'
import 'bootstrap/dist/css/bootstrap.css';

if (!process.env.WALLET_CONNECT_PROJECT_ID) {
  throw new Error('You need to provide WALLET_CONNECT_PROJECT_ID env variable')
}

const chains = [baseGoerli]
const projectId = process.env.WALLET_CONNECT_PROJECT_ID

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


function MyApp({ Component, pageProps }) {


  return (
  <>
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} themeVariables={{
    '--w3m-background-color': '#FFFF09',
    '--w3m-accent-color': '#FFFF09',
    '--w3m-button-border-radius': '50px',
    '--w3m-background-border-radius': '50px',
    '--w3m-container-border-radius': '50px',
    '--w3m-accent-fill-color': '#0C0C0C',
    '--w3m-color-fg-1': '#ffffff',
    '--w3m-text-medium-regular-text-transform': 'uppercase',
    '--w3m-text-medium-regular-weight': '600',
    '--w3m-background-border-radius': '35px',
    '--w3m-container-border-radius': '35px',
  }}  
  defaultChain={baseGoerli}/>
  </>
)
}

export default MyApp
