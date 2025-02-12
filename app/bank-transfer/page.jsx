'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'redaxios'

const fetchBanks = async () => {
    const res = await axios.get('https://api.nomba.com/v1/transfers/banks', {headers: {
     Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOMBA_CLIENT_ID}`,
     accountId: process.env.NEXT_PUBLIC_NOMBA_ACCOUNT_ID   
    }})
    console.log(res.data, 'res.data')
    if(res.data.code === '00'){
        return res.data.data.results
    } else {
        throw new Error(res.data.description)
    }
}

export default function BankTransfer() {
    const [accountNumber, setAccountNumber] = useState("");
    const [bank, setBank] = useState("");
    const [banks, setBanks] = useState([])
    const [accountName, setAccountName] = useState("");
    const [amount, setAmount] = useState("");
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const data = await fetchBanks();
            setBanks(data)
        })()
    }, [])
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-gray-500">
        <h1 className="text-2xl font-bold mb-6">BANK TRANSFER</h1>
        <input className="p-2 border mb-4" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        <input className="p-2 border mb-4" placeholder="Select Bank" value={bank} onChange={(e) => setBank(e.target.value)} list="banks-list"/>
        <datalist id="banks-list">
            {
                banks?.map((bank) => {
                    return <option value={bank?.code}>{bank.name}</option>
                })
            }
            
        </datalist>
        <button className="p-2 bg-blue-500 text-white mb-4">VERIFY</button>
        <input className="p-2 border mb-4" placeholder="Account Name" value={accountName} readOnly />
        <input className="p-2 border mb-4" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className="p-2 bg-green-500 text-white">TRANSFER</button>
        <button className="p-2 bg-blue-500 text-white mt-4" type='button' onClick={() => {
            router.push('/')
        }}>HOME</button>
      </div>
    );
  }