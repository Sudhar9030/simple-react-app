'use client'

import { useEffect } from "react";
import Transactions from "./(pages)/transactions/page";
import { useRouter } from 'next/navigation'


export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  },[])



  return (
      <div className="flex justify-center min-h-screen flex-wrap m-10">
        <Transactions></Transactions>
      </div>
  );
}
