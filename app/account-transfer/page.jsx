'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountTransfer() {
    const [recipientId, setRecipientId] = useState("");
    const [amount, setAmount] = useState("");
    const router = useRouter()
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-gray-500">
        <h1 className="text-2xl font-bold mb-6">ACCOUNT TRANSFER</h1>
        <input className="p-2 border mb-4" placeholder="Recipient ID" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} />
        <input className="p-2 border mb-4" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className="p-2 bg-green-500 text-white">TRANSFER</button>
        <button className="p-2 bg-blue-500 text-white mt-4" type='button' onClick={() => {
            router.push('/')
        }}>HOME</button>
      </div>
    );
  }