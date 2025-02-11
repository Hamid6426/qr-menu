import React, { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { jwtDecode } from "jwt-decode";

const CreateStoreForm = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    address: "",
    storePhone: "",
    storeEmail: "",
    storeWebsite: "",
    storeThumbnail: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "storeThumbnail") {
      setFormData({ ...formData, storeThumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
  
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      if (!token) {
        setMessage("Authentication error. Please log in again.");
        setIsSubmitting(false);
        return;
      }
  
      const decodedToken = jwtDecode(token);
      const adminId = decodedToken.id; // Extract adminId from token
  
      // Append all form data
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      formDataToSend.append("adminId", adminId); // Append adminId
  
      const response = await axiosInstance.post("/stores/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
  
      setMessage("Store created successfully!");
      setFormData({
        storeName: "",
        description: "",
        address: "",
        storePhone: "",
        storeEmail: "",
        storeWebsite: "",
        storeThumbnail: null,
      });
  
      // Reset file input
      const fileInput = document.getElementById("storeThumbnail");
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error creating store:", error);
      setMessage("Failed to create store. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <div className="mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl w-[320px]">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">
        Create Store
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={formData.storeName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          name="storePhone"
          placeholder="Phone"
          value={formData.storePhone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="email"
          name="storeEmail"
          placeholder="Email"
          value={formData.storeEmail}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          name="storeWebsite"
          placeholder="Website"
          value={formData.storeWebsite}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="file"
          name="storeThumbnail"
          id="storeThumbnail"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white font-semibold rounded-lg focus:outline-none`}
        >
          {isSubmitting ? "Creating..." : "Create Store"}
        </button>

        {/* Error/Success Message */}
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default CreateStoreForm;