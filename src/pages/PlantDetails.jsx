// src/pages/PlantDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchPlants from "../utils/plantsData";
import { showToast } from "../components/Toast";
import { useAuth } from "../provider/AuthProvider";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const { user } = useAuth();

  useEffect(() => {
    fetchPlants().then((plants) => {
      const found = plants.find((p) => p.plantId === parseInt(id));
      setPlant(found);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("success", "Consultation booked successfully!");
    setFormData({ name: "", email: "" });
  };

  const handleBuyNow = () => {
    if (!user) {
      showToast("error", "Please login to buy!");
      return;
    }
    showToast("success", `You bought ${plant.plantName}!`);
    // পরে payment gateway যোগ করতে পারো
  };

  if (!plant) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={plant.image}
          alt={plant.plantName}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{plant.plantName}</h1>
          <p className="text-gray-600 mt-2">
            {plant.category} • {plant.careLevel}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-3xl font-bold text-green-700">${plant.price}</span>
            <span className="text-yellow-500 text-xl">Rating: {plant.rating}</span>
          </div>
          <p className="mt-4 text-gray-700">{plant.description}</p>
          <p className="mt-2">
            <strong>Stock:</strong> {plant.availableStock} left
          </p>
          <p className="mt-2">
            <strong>Provider:</strong> {plant.providerName}
          </p>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Buy Now for ${plant.price}
          </button>

          {/* Book Consultation */}
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-green-800">
              Book Expert Consultation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}