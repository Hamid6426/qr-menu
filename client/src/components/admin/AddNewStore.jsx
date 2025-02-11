import { MdAddCircle } from "react-icons/md"

export default function AddNewStore() {
  return (
    <>
      <div className="bg-red-600 flex flex-col justify-center items-center w-60 h-60 rounded-lg">
        <div className="w-60 h-40 flex flex-col justify-center items-center">
          <MdAddCircle className="w-32 h-32 text-white" />
        </div>

      </div>
    </>
  )
}
