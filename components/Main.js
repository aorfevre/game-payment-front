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
import { sendTransaction, waitForTransaction,switchNetwork } from '@wagmi/core'
import { parseEther } from 'viem'



function Main({ }) {

  const router = useRouter()
  const {push} = useRouter()
  const {hash} = router.query

  const [params, setParams] = useState('')

  // Component Wagmi state to avoid hydration warning/error
  const [connectionStat, setConnectionStat] = useState()

  const [loading, setLoading] = useState(false)


  // Wagmi Account
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  // const { switchNetwork } = useSwitchNetwork()



  const callDecode = async (params) => {
    try {
      const res = await fetch(`${process.env.PUBLIC_API_URL}/decode?hash=${encodeURIComponent(decodeURIComponent(params))}`);
      const data = await res.json();
     return data;
    } catch (err) {
      console.log(err);
    }
  };
  //save the transaction hash to my api /play 
  const savePlayTransaction = async(hash,txhash)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        txhash,
        hash
      })
    };

    return await fetch(`${process.env.PUBLIC_API_URL}/play`, requestOptions)

  }

  
  // copy the value to state here
  useEffect(() => {
    setConnectionStat(isConnected)

    if(isConnected && hash && chain && chain?.id === Number(process.env.PUBLIC_CHAIN_ID)){

      setTimeout(async() => {  

          console.log
          const decoded = await callDecode(hash);
          console.log('Decoded',decoded)
          if(decoded && decoded.price && decoded.price >0 ){
            setParams(decoded);
            handleTransaction(decoded,hash)
          }
        

      },1000)
    }


  }, [isConnected,hash])

  useEffect(() => {
    if (isConnected && chain && chain?.id !== Number(process.env.PUBLIC_CHAIN_ID)) {
      setTimeout(()=>{
        switchNetwork({chainId:Number(process.env.PUBLIC_CHAIN_ID)})

      },500)
    }
  }, [chain])


  const handleTransaction = async(decoded,d) => {
    setLoading(true)
    console.log('Doing a transaction',decoded)
    if(decoded && decoded.price >0){
      const { hash } = await sendTransaction({
        chainId: Number(process.env.PUBLIC_CHAIN_ID),
        to: decoded.payout_wallet,
        value: parseEther(((decoded.price * decoded.number * 1000)/1000 ).toString()),
      })
      console.log('HASH OF THE TRANSCATION',hash)
      // Transaction is sent ! 
      savePlayTransaction(d,hash)
  
      const data = await waitForTransaction({
        hash
      })
      console.log('data finished',data)
      if(data){
        push('/success')

      }
    }

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
               
               {params && params.price && !isNaN(params.price)? <>
               <ul>
                <li>Game: {params.game}</li>
                <li>Action: {params.action}</li>
                <li>Bet size per play: {params.price}</li>
                <li>Number of plays: {params.number}</li>
                <li>Total bet: {params.number*params.price}</li>
               </ul>
               </>: <></>}
                {params && params.price && !isNaN(params.price)? <>
                
                      <button
                        className={styles.btn}
                        disabled={loading === true ? 'disabled' : ''}
                        type="button"
                        onClick={handleTransaction}
                      >
                        {loading ? (
                          <Loading text={'Buying actions..'} />
                        ) :  (
                          `Participate with ${params.number*params.price}ETH`
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
