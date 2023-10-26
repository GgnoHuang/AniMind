import Link from "next/link"

function Home() {
  return (
    <div className=" p-8 border-red-500 h-full ">
      {/* <h4 className="bg-blue-200 rounded-lg p-2">歡迎使用記帳功能！</h4> */}

      <p className="  text-blue-800 bg-blue-200 rounded-lg p-3 mb-3 font-bold text-2xl flex items-center justify-center">
        歡迎使用記帳功能
      </p>

      <div className="p-8 flex items-center flex items-center justify-center">
        <button class="text-white p-2 rounded bg-blue-500 hover:bg-blue-600 ">
          <Link href="/Accounting">開始記帳</Link>
        </button>
      </div>
    </div>
  )
}

export default Home
