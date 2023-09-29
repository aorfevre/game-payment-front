import Head from 'next/head'
import React, { useEffect, useState } from "react";
import styles from "../styles/index.module.css";
import Main from '../components/Main'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { useContractRead } from 'wagmi'


export default function Home() {

  return (

    <div className={styles.main}>
      <Head>
        <title className={styles.title}>Buy Leonardo a Coffee!</title>
        <meta name="description" content="Tipping site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />

     
      <Footer />

    </div>
  )

}
