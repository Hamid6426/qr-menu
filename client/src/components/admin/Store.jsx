import { Link } from "react-router-dom"

export default function Store() {
  return (
    <>
      <div className="bg-red-600 flex flex-col justify-center items-center w-60 h-60 rounded-lg">
        <div className="w-60 h-40 border-b border-black flex flex-col justify-center items-center">
        <img src="/logo.svg" alt="Restaurant logo" className="w-32"/>
        </div>
          <Link
            href="/store-details" 
            className="text-2xl font-bold py-3 text-white hover:text-black">LOREM IPSUM</Link>
      </div>
    </>
  )
}
