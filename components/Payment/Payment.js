'use client'
import React, { useState, useEffect, useRef } from 'react';
import paymentStyle from './payment.module.scss';
import styles from '../../styles/global.module.scss';

import Loading from '../Loading';
import stylesMain from '../../styles/Main.module.css';
import { Web3Button } from '@web3modal/react';
import {
  useAccount,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { useRouter } from 'next/router';
import { sendTransaction, waitForTransaction,switchNetwork } from '@wagmi/core';
import { parseEther } from 'viem';
import Button from '../Button/Button';
import { useWeb3Modal } from '@web3modal/react'


function Payment() {
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [BtnTitle, setBtnTitle] = useState('Connect wallet');
  const { open, close } = useWeb3Modal()

  const handlePayment = () => {
    paymentStatus ==2 ? setPaymentStatus(0) : (setPaymentStatus(paymentStatus+1), setBtnTitle('Back to Telegram'));
  }

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
        push('/success');
      }
    }
    setLoading(false)
  }


  return (
    <div className={paymentStyle.payment}>
        <div className="container">
            <div className="row">
                <div className={`${paymentStyle.col_logo} ${paymentStatus === 2 && paymentStyle.confirmed} text-center col-lg-12` }>
                  <img src="/assets/images/logo.svg" alt="logo" className={paymentStyle.logo} />
                </div>
                <div className={`${paymentStyle.col_cta} col-lg-12`}>
                    <h2 className={`${styles.h2} ${paymentStyle.title}` }>
                      { paymentStatus === 0 ? 'Pay to enter duel' : paymentStatus === 1 ? 'Error' : 'Payment confirmed' }
                      </h2>
                    <div className={paymentStyle.body}>
                      { paymentStatus === 0 && params && 
                        <> Pay {(params.price * params.number * 1000)/1000} ETH to play {params.number } game(s) of {params.game} </> 
                      }
                       { paymentStatus === 0 && !params && 
                        <> Loading ... </> 
                      }
                      { paymentStatus === 1 &&  
                        <>
                          We didn’t recognize your payment hash :{`(`} <br />
                            Please close the tab and return to the Telegram bot and click the payment URL without making any changes to it.<br />
                            <br />
                            If the issue persists, please contact {`<contact email>`}      
                        
                        </>
                      }
                      { paymentStatus === 2 && 
                        <>
                          Your payment has been received!<br />
                          You’ll be matched with opponents. We’ll keep you up-to-date on the status of your duels through our Telegram bot.   
                      </>
                      }
                      </div>
                      {
                        paymentStatus != 2 && 
                        <div>
                          <Web3Button icon="hide" label="Connect Wallet" balance="hide" size={'md'}/>
                          <Button type="button" onClick = {()=> open()} disabled={false} className="" title={'Connect Wallet Alt'} link="" glow={true} />
                          <Button type="button" onClick = {handlePayment} disabled={false} className="" title={BtnTitle} link="" glow={true} />
                        </div>
                      }
                </div>
                { paymentStatus === 0 ? 
                  <div className={`${paymentStyle.bottom_wrap} col-lg-12`}>
                    <div className={paymentStyle.content}>
                        After the payment has been confirmed, you’ll be matched with opponents. We’ll keep you up-to-date on the status of your duels through our Telegram bot.
                    </div>
                </div>
                :
                <></>}
            </div>
        </div>

        {/* TODO Main.js copy */}
        <div className={stylesMain.container}>
          <section className={stylesMain.container_form}>
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
                          className={stylesMain.btn}
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
           
          </section>
        </div>
    </div>
  )
}

export default Payment
