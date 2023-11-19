"use client";
import React, { useState, useEffect, useRef } from "react";
import paymentStyle from "./payment.module.scss";
import styles from "../../styles/global.module.scss";
import Loading from "../Loading/Loading";
import stylesMain from "../../styles/Main.module.css";
import { useAccount, useNetwork } from "wagmi";
import { useRouter } from "next/router";
import {
  sendTransaction,
  waitForTransaction,
  switchNetwork,
} from "@wagmi/core";
import { parseEther } from "viem";
import Button from "../Button/Button";

function Payment() {
  const [paymentStatus, setPaymentStatus] = useState(0);

  const router = useRouter();
  const { hash } = router.query;

  const [params, setParams] = useState("");

  // Component Wagmi state to avoid hydration warning/error
  const [loading, setLoading] = useState(false);
  const [networkValid, setNetworkValid] = useState(false);

  // Wagmi Account
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const callDecode = async (params) => {
    try {
      const res = await fetch(
        `${process.env.PUBLIC_API_URL}/decode?hash=${encodeURIComponent(
          decodeURIComponent(params)
        )}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  //save the transaction hash to my api /play
  const savePlayTransaction = async (hash, txhash) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        txhash,
        hash,
      }),
    };

    return await fetch(`${process.env.PUBLIC_API_URL}/play`, requestOptions);
  };

  // copy the value to state here
  useEffect(() => {
    if (hash) {
      setTimeout(async () => {
        const decoded = await callDecode(hash);
        console.log("Decoded", decoded);
        if (decoded && decoded.price && decoded.price > 0) {
          setParams(decoded);
          // if (
          //   isConnected &&
          //   chain &&
          //   chain?.id === Number(process.env.PUBLIC_CHAIN_ID)
          // ) {
          //   handleTransaction(decoded,hash)
          // }
        }
      }, 10);
    }
  }, [ hash]);

  useEffect(() => {
    console.log('Chain',chain.id)
    if (
      isConnected &&
      chain &&
      chain?.id === Number(process.env.PUBLIC_CHAIN_ID)
    ) {
      setNetworkValid(true)
    }else{
      setNetworkValid(false)

    }
  }, [chain]);

  const switchNetworkToApp = async()=>{
        if (
      isConnected &&
      chain &&
      chain?.id !== Number(process.env.PUBLIC_CHAIN_ID)
    ) {
        await switchNetwork({ chainId: Number(process.env.PUBLIC_CHAIN_ID) });
    }
  }
  const handleTransaction = async () => {
    setLoading(true);
    console.log("Doing a transaction", params,params.price);

    if (params && params.price > 0) {

      const { hash } = await sendTransaction({
        chainId: Number(process.env.PUBLIC_CHAIN_ID),
        to: params.payout_wallet,
        value: parseEther(
          ((params.price * params.number * 1000) / 1000).toString()
        ),
      });
      console.log("HASH OF THE TRANSCATION", hash);
      // Transaction is sent !
      savePlayTransaction(d, hash);

      const data = await waitForTransaction({
        hash,
      });

      if (data) {
        setPaymentStatus(2);
      } else {
        setPaymentStatus(1);
      }
    }
    setLoading(false);
  };

  return (
    <div className={paymentStyle.payment}>
      <div className="container">
        <div className="row">
          <div
            className={`${paymentStyle.col_logo} ${
              paymentStatus === 2 && paymentStyle.confirmed
            } text-center col-lg-12`}
          >
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              className={paymentStyle.logo}
            />
          </div>
          <div className={`${paymentStyle.col_cta} col-lg-12`}>
            <h2 className={`${styles.h2} ${paymentStyle.title}`}>
              {paymentStatus === 0
                ? "Pay to enter duel"
                : paymentStatus === 1
                ? "Error"
                : "Payment confirmed"}
            </h2>
            <div className={paymentStyle.body}>
              {paymentStatus === 0 && params && (
                <>
                  {" "}
                  Pay {(params.price * params.number * 1000) / 1000} ETH to play{" "}
                  {params.number} game(s) of {params.game}{" "}
                </>
              )}
              {isConnected && paymentStatus === 0 && !params && (
                <Loading text={"Loading..."} padding="p-1" />
              )}
              {paymentStatus === 1 && (
                <>
                  We didn’t recognize your payment hash : <br />
                  Please close the tab and return to the Telegram bot and click
                  the payment URL without making any changes to it.
                  <br />
                  <br />
                  If the issue persists, please contact
                  hello.deductionduel@gmail.com
                </>
              )}
              {paymentStatus === 2 && (
                <>
                  Your payment has been received!
                  <br />
                  You’ll be matched with opponents. We’ll keep you up-to-date on
                  the status of your duels through our Telegram bot.
                </>
              )}
            </div>
            {paymentStatus != 2 && (
              <div className="p-2">
                <w3m-button
                  icon="hide"
                  label="Connect Wallet"
                  balance="hide"
                  size={"md"}
                />
                
                {/* <Button type="button" onClick = {()=> open()} disabled={false} className="" title={'Connect Wallet Alt'} link="" glow={true} /> */}
                {isConnected && networkValid ?(
                      <>
                      
                      <div className="p-5">
                     {params && params.price && !isNaN(params.price) ? (
                       <>
                         {loading ? (
                           <Loading text={"Buying actions.."} padding="" />
                         ) : (
                           <Button
                             type="button"
                             onClick={handleTransaction}
                             disabled={false}
                             className=""
                             title={`Play your game`}
                             link=""
                             glow={true}
                           />
                         )}
                       </>
                     ) : (
                       <></>
                     )}
                   </div>
                   
                   </>
                    ):<>{ 
                      isConnected && networkValid === false ? (
                      <> <Button
                      type="button"
                      onClick={switchNetworkToApp}
                      disabled={false}
                      className=""
                      title={`Switch Network to Play`}
                      link=""
                      glow={true}
                    /></>
                    ) : (<></>)}
                    </>
                  }
                  
                
              </div>
            )}
          </div>
          {paymentStatus === 0 ? (
            <div className={`${paymentStyle.bottom_wrap} col-lg-12`}>
              <div className={paymentStyle.content}>
                After the payment has been confirmed, you’ll be matched with
                opponents. We’ll keep you up-to-date on the status of your duels
                through our Telegram bot.
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
