'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../_services/axiosInstance";


const fetchBanks = async () => {
    try {

        const res = await api.get('/transfers/banks')
        console.log(res, 'responses')
        if(res.data.code === '00'){
            return res.data.data
        } else {
            throw new Error(res.data.description)
        }
    } catch(err){
        console.log(err, 'err')
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
                banks?.map((bank, index) => {
                    return <option key={`${bank.code}-${index}`} value={bank?.code}>{bank.name}</option>
                })
            }
            
        </datalist>
        <button className="disabled:bg-gray-300 disabled:cursor-not-allowed p-2 bg-blue-500 text-white mb-4" type="button" onClick={async () => {
            const res = await api.post('/transfers/bank/lookup', {accountNumber, bankCode: bank})
            if (res.data?.code === '00'){
                setAccountName(res.data?.data?.accountName)
            }
            
        }} disabled={accountName}>VERIFY</button>
        <input className="p-2 border mb-4" placeholder="Account Name" value={accountName} readOnly />
        <input className="p-2 border mb-4" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className="p-2 bg-green-500 text-white" type="button" onClick={async () => {
            const res = await api.post('/transfers/bank', {
                accountNumber, bankCode: bank,
                amount: amount,
                accountName,
                merchantTxRef: `TX_${Date.now()}`,
                narration: `Sending ${amount} to ${accountName}`,
                senderName: 'Nomba client app'
            })
            console.log(res.data, 'res.data')
            if (res.data?.code === '00'){
                alert(`Transfer Successfully made to ${accountName}`)
            }
        }}>TRANSFER</button>
        <button className="p-2 bg-blue-500 text-white mt-4" type='button' onClick={() => {
            router.push('/')
        }}>HOME</button>
      </div>
    );
  }