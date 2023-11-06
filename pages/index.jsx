import Head from 'next/head'
import React from "react";
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import CardGrid from '../components/CardGrid/CardGrid';
import BottomWrap from '../components/BottomWrap/BottomWrap';
import { data, dataIcon } from '../constants/data';
import styles from "./index.module.scss";

export default function Home() {

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
      <CardGrid data={data} bgSchema='light' glow={true} />
      <CardGrid data={dataIcon} bgSchema='dark'/> 
      <BottomWrap /> 
    </div>
  )
}
