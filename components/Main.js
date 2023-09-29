import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loading from './Loading.js'
import styles from '../styles/Main.module.css'
import { Web3Button } from '@web3modal/react'
import {
  useAccount,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'
import { useRouter } from 'next/router'
import { sendTransaction, prepareSendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
function Main({ }) {

  const router = useRouter()
  const {hash} = router.query

  const [params, setParams] = useState('')

  // Component Wagmi state to avoid hydration warning/error
  const [connectionStat, setConnectionStat] = useState()

  const [loading, setLoading] = useState(false)


  // Wagmi Account
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    if (chain?.id !== 11155111 && chain?.name !== 'Sepolia') {
      switchNetwork?.(11155111)
    }
  }, [chain, switchNetwork])


  const callDecode = async (params) => {
    try {
      const res = await fetch(`${process.env.PUBLIC_API_URL}/decode?hash=${encodeURIComponent(decodeURIComponent(params))}`);
      const data = await res.json();
     return data;
    } catch (err) {
      console.log(err);
    }
  };
  // copy the value to state here
  useEffect(() => {
    setConnectionStat(isConnected)
    console.log('isConnected', isConnected)
    setTimeout(async() => {  

      if(isConnected==true && hash){
        console.log
        const decoded = await callDecode(hash)
        setParams(decoded);
        console.log('Launch Transaction')
        handleTransaction()

      }
    },1000)

  }, [isConnected,hash])


  const handleTransaction = async() => {
    setLoading(true)
    console.log('Doing a transaction')
    const { hash } = await sendTransaction({
      chainId: 11155111,
      to: '0xD230909236F0627049CC035B95dd8BCA455C7B9B',
      value: parseEther((params.price * 0.001 ).toString()),
    })
    setLoading(false)
  }

  return (
    <main className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.image_container}>
          <Image
            priority={true}
            className={styles.image}
            src="/presentation.jpg"
            layout="fill"
            objectFit="contain"
            alt="Chefleo"
          />
        </div>

        <section className={styles.container_form}>
          {isConnected && (
            <>
               
                {params && params.price ? <>
                
                      <button
                        className={styles.btn}
                        disabled={loading === true ? 'disabled' : ''}
                        type="button"
                        onClick={handleTransaction}
                      >
                        {loading ? (
                          <Loading text={'Buying actions..'} />
                        ) :  (
                          `Send ${params.price} Actions for 0.001ETH`
                        ) }
                    </button>
                  </>: <></>}
            </>
          )}
          <Web3Button icon="hide" label="Connect Wallet" balance="hide" />
        </section>

        <div className={styles.svg_container}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-[180px] w-full fill-current text-[#E5BA73]"
          >
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"></path>
          </svg>
        </div>
      </div>
    </main>
  )
}

export default Main
