const fetchPlants = async () => {
  const res = await fetch("/plants.json");
  return await res.json();
};

export default fetchPlants;