import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
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
    <div className="w-full min-h-screen px-6">
      <h2 className="text-3xl font-black my-6 text-center">Admin Dashboard</h2>

      {loading ? (
        <p>Loading stores...</p>
      ) : stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        <div className="flex flex-col justify-center items-center w-full gap-6 pb-6">
          {stores.map((store) => {
            // Convert Buffer to Base64
            let imageSrc = "";
            if (store.storeThumbnail?.data) {
              const base64String = btoa(
                new Uint8Array(store.storeThumbnail.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              imageSrc = `data:image/jpeg;base64,${base64String}`;
            }

            return (
              <div
                key={store._id}
                className="w-full max-w-sm bg-white shadow-xl border-gray-400 border-2 rounded-lg p-4"
              >
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={store.storeName}
                    className="w-full rounded-lg object-cover"
                  />
                )}
                <h3 className="text-xl font-bold my-4">{store.storeName}</h3>
                <p className="text-gray-600 mb-4">{store.description}</p>
                <div className="grid grid-cols-12 gap-4">
                  <strong className="col-span-2">Address</strong>
                  <div className="col-spam-1"></div>
                  <p className="col-span-8">{store.address}</p>
                  <strong className="col-span-2">Phone</strong>
                  <div className="col-spam-1"></div>
                  <p className="col-span-8">{store.storePhone}</p>
                  <strong className="col-span-2">Email</strong>
                  <div className="col-spam-1"></div>
                  <p className="col-span-8">{store.storeEmail}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <Link
                    to={`/admin/stores/${store._id}`} // Navigate to StoreDetail page
                    className="text-center mx-auto text-blue-600 hover:underline"
                  >
                    Store Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hide "Add a Store" button if the admin has 3 stores */}
      {stores.length < 3 && (
        <a
          href="/admin/create-store"
          className="text-red-600 hover:underline block mt-4"
        >
          Add a Store
        </a>
      )}
    </div>
  );
}
