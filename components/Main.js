import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loading from './Loading/Loading'
import styles from '../styles/Main.module.css'

import { useRouter } from 'next/router'




function Main({ }) {

  const router = useRouter()
  const {push} = useRouter()
  const {hash} = router.query


  return (
    <main >
     


    </main>
  )
}

export default Main
