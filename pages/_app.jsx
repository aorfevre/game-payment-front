import "../styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { base,baseGoerli,goerli } from 'viem/chains'
import "bootstrap/dist/css/bootstrap.css";

if (!process.env.WALLET_CONNECT_PROJECT_ID) {
  throw new Error("You need to provide WALLET_CONNECT_PROJECT_ID env variable");
}

const findChain = (chainId) => {
  if (chainId === baseGoerli.chainId) {
    return baseGoerli;
  } else if (chainId === goerli.chainId) {
    return goerli;
  } 
    return base;
};
const chainSelected = findChain(process.env.PUBLIC_CHAIN_ID);
const chains = [chainSelected];
const projectId = process.env.WALLET_CONNECT_PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}


const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata
 })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, defaultChain:baseGoerli,chains,metadata, themeVariables:{
  "--w3m-background-color": "#FFFF09",
  "--w3m-accent-color": "#FFFF09",
  "--w3m-button-border-radius": "50px",
  "--w3m-background-border-radius": "50px",
  "--w3m-container-border-radius": "50px",
  "--w3m-accent-fill-color": "#0C0C0C",
  "--w3m-color-fg-1": "#ffffff",
  "--w3m-text-medium-regular-text-transform": "uppercase",
  "--w3m-text-medium-regular-weight": "600",
  "--w3m-background-border-radius": "35px",
  "--w3m-container-border-radius": "35px",
} })

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        

        <Component {...pageProps} />
      </WagmiConfig>

      {/* <Web3Modal
        config={wagmiConfig}
        themeVariables={{
          "--w3m-background-color": "#FFFF09",
          "--w3m-accent-color": "#FFFF09",
          "--w3m-button-border-radius": "50px",
          "--w3m-background-border-radius": "50px",
          "--w3m-container-border-radius": "50px",
          "--w3m-accent-fill-color": "#0C0C0C",
          "--w3m-color-fg-1": "#ffffff",
          "--w3m-text-medium-regular-text-transform": "uppercase",
          "--w3m-text-medium-regular-weight": "600",
          "--w3m-background-border-radius": "35px",
          "--w3m-container-border-radius": "35px",
        }}
        defaultChain={chainSelected}
        metadata={metadata}
      /> */}
    </>
  );
}

export default MyApp;
