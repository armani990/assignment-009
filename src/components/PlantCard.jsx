// src/components/PlantCard.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { showToast } from "./Toast";

export default function PlantCard({ plant }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (!user) {
      showToast("error", "Please login to view plant details!");
      navigate("/login", { state: { from: `/plant/${plant.plantId}` } });
    } else {
      navigate(`/plant/${plant.plantId}`);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      showToast("error", "Please login to add to cart!");
      navigate("/login", { state: { from: `/plant/${plant.plantId}` } });
    } else {
      showToast("success", `${plant.plantName} added to cart!`);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <img
        src={plant.image}
        alt={plant.plantName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{plant.plantName}</h3>
        <p className="text-sm text-gray-600">{plant.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-green-700">${plant.price}</span>
          <span className="text-yellow-500 text-sm">Rating: {plant.rating}</span>
        </div>

        <button
          onClick={handleViewDetails}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-medium"
        >
          View Details
        </button>

        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-[#333333] text-white py-2 rounded hover:bg-[#374151] transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}