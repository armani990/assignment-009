// src/components/PlantsPreview.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import { useAuth } from "../provider/AuthProvider";
import { showToast } from "./Toast";

const PlantsPreview = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // ← লগইন চেক

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data.slice(0, 3)));
  }, []);

  const handleSeeMore = () => {
    if (!user) {
      showToast("error", "Please login to see all plants!");
      navigate("/login", { state: { from: "/plants" } }); // ← লগইনের পর /plants এ ফিরবে
    } else {
      navigate("/plants");
    }
  };

  return (
    <div className="my-16 text-center px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        All Indoor Plants
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <PlantCard key={plant.plantId} plant={plant} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3">Loading plants...</p>
        )}
      </div>

      <button
        onClick={handleSeeMore}
        className="mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md"
      >
        See More Plants
      </button>
    </div>
  );
};

export default PlantsPreview;