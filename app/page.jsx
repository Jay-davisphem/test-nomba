import Link from "next/link";



export default function Page() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-600">NOMBA TRANSFER</h1>
      <div className="flex space-x-6">
        <Link href="/bank-transfer">
          <div className="p-6 bg-white rounded-2xl shadow-md cursor-pointer hover:bg-gray-200 text-gray-600">
            BANK TRANSFER
          </div>
        </Link>
        <Link href="/account-transfer">
          <div className="p-6 bg-white rounded-2xl shadow-md cursor-pointer hover:bg-gray-200 text-gray-600">
            ACCOUNT TRANSFER
          </div>
        </Link>
      </div>
    </div>
  );
}