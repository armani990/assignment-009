import { useEffect, useState } from "react";
import fetchPlants from "../utils/plantsData";
import PlantCard from "../components/PlantCard";

export default function Plants() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants().then(setPlants);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">All Indoor Plants</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plants.map(plant => (
          <PlantCard key={plant.plantId} plant={plant} />
        ))}
      </div>
    </div>
  );
}