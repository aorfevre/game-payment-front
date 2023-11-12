import Head from 'next/head'
import React from "react";
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import CardGrid from '../components/CardGrid/CardGrid';
import BottomWrap from '../components/BottomWrap/BottomWrap';
import { data, dataIcon } from '../constants/data';
import styles from "./index.module.scss";
import { useEffect, useState } from 'react'

export default function Home() {

  const [params, setParams] = useState([])


  const callHomeStats = async (params) => {
    try {
      const res = await fetch(`${process.env.PUBLIC_API_URL}/home/stats`);
      const data = await res.json();
      setParams(data)
     return data;
    } catch (err) {
      console.log(err);
    }
  };
  // copy the value to state here
  useEffect(() => {
    callHomeStats()

  }, [])
  return (
    <div className={styles.main}>
      <Head>
        <title className={styles.title}>Play Web3 Games!</title>
        <meta name="description" content="Web3 Games" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"></link>
      </Head>

      <Header />
      <Hero />
      <CardGrid data={params} bgSchema='light' glow={true} />
      <CardGrid data={dataIcon} bgSchema='dark'/> 
      <BottomWrap /> 
    </div>
  )
}
