import { useState, useEffect } from "react";
import StoreList from "../../components/admin/StoreList";
import axiosInstance from "../../utils/axiosConfig";

export default function AdminDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosInstance.get("/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="w-full min-h-screen px-6 py-3 justify-start flex flex-col items-center">
      <h2 className="text-3xl font-black text-center">Admin Dashboard</h2>

      {/* Store List Component */}
      <StoreList stores={stores} setStores={setStores} loading={loading} />

      {/* Add Store Button */}
      <a
        href="/admin/create-store"
        className={`text-center mx-auto font-bold rounded py-2 px-4 ${
          stores.length >= 3 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-700"
        }`}
        style={{ pointerEvents: stores.length >= 3 ? "none" : "auto" }}>
        Add a Store
      </a>
    </div>
  );
}
