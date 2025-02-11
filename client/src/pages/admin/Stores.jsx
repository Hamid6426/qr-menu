import AddNewStore from "../../components/admin/AddNewStore";
import Store from "../../components/admin/Store";

export default function Stores() {
  return (
    <div className="w-full min-h-screen px-6">
      <h2 className="text-3xl font-black my-4">Your Stores</h2>
      <div className="flex flex-row gap-x-4 overflow-y-auto pb-4">
        <Store />
        <Store />
        <AddNewStore/>
      </div>
    </div>
  )
}