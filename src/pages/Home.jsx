import { useEffect, useState } from "react";
import fetchPlants from "../utils/plantsData";
import PlantCard from "../components/PlantCard";
import PlantsPreview from "../components/PlantsPreview";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants().then(setPlants);
  }, []);

  // Top Rated: Sort by rating (descending), take top 3
  const topRated = [...plants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

 const heroSlides = [
    {
      bg: "https://cdn.mos.cms.futurecdn.net/T46YEc2vCtWBrc3z2YFzcd.jpg",
      title: "Welcome to GreenNest",
      subtitle: "Nurture Your Green Space",
    },
    {
      bg: "https://www.intelligentliving.co/wp-content/uploads/2025/08/Tips-for-Taking-Care-of-Your-Indoor-Plants.jpg",
      title: "Bring Nature Home",
      subtitle: "Discover indoor plants that refresh your space",
    },
    {
      bg: "https://static.toiimg.com/thumb/msid-124596080,width-1280,height-720,resizemode-4/124596080.jpg",
      title: "Nature’s Touch, Indoors",
      subtitle: "Curated plants for style and wellness",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SLIDER */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-96 relative"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="absolute inset-0 bg-none bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold">{slide.title}</h1>
                <p className="mt-2 text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* TOP RATED PLANTS */}
      <PlantsPreview plants={topRated} />

      {/* PLANT CARE TIPS */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-green-800">Plant Care Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "💧", title: "Watering", tip: "Water when top soil is dry. Avoid overwatering." },
              { icon: "☀️", title: "Sunlight", tip: "Most indoor plants love bright, indirect light." },
              { icon: "🌱", title: "Fertilizing", tip: "Feed monthly during growing season." },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-green-700">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET OUR EXPERTS */}
       <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-green-800">Meet Our Green Experts</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Emma Leaf", spec: "Air Purifiers", image: "https://randomuser.me/api/portraits/women/68.jpg" },
              { name: "Raj Bloom", spec: "Flowering Plants", image: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Sofia Root", spec: "Tropicals", image: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Liam Green", spec: "Low-Light Care", image: "https://randomuser.me/api/portraits/men/54.jpg" },
            ].map((expert, i) => (
              <div key={i} className="bg-green-50 p-6 rounded-lg shadow-md">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-green-200"
                />
                <h4 className="font-semibold text-green-800">{expert.name}</h4>
                <p className="text-sm text-gray-600">{expert.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANT OF THE WEEK */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-800">Plant of the Week</h2>
          <img
            src="https://i0.wp.com/buygreen.in/wp-content/uploads/2022/09/bird-nest-snake-plant.gif?fit=960%2C960&ssl=1"
            alt="Plant of the Week"
            className="mx-auto rounded-xl shadow-xl max-h-72 object-cover border-4 border-green-200"
          />
          <h3 className="mt-4 text-xl font-bold text-green-700">Snake Plant</h3>
          <p className="text-gray-600">The ultimate low-maintenance air purifier!</p>
        </div>
      </section>

      {/* ECO DECOR IDEAS */}
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-green-800">Eco Decor Ideas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://m.media-amazon.com/images/I/71E+C+7+bDL._AC_UF894,1000_QL80_.jpg"
                alt="Hanging Plants"
                className="w-full h-48 object-cover rounded"
              />
              <h4 className="mt-4 font-semibold text-green-700">Hanging Greens</h4>
              <p className="text-sm text-gray-600">Suspend plants for a boho vibe.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://tedsgardens.com/wp-content/uploads/2021/07/TL-Houseplant-Shelving-IdeasFeature-houseplants-shelving-ideas.jpg"
                alt="Shelf Styling"
                className="w-full h-48 object-cover rounded"
              />
              <h4 className="mt-4 font-semibold text-green-700">Shelf Styling</h4>
              <p className="text-sm text-gray-600">Mix pots on open shelves.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqxcGojUQcjQxj1LuBiko5Q5DGaZvJzl5ug&s"
                alt="Corner Jungle"
                className="w-full h-48 object-cover rounded"
              />
              <h4 className="mt-4 font-semibold text-green-700">Corner Jungle</h4>
              <p className="text-sm text-gray-600">Create a mini forest in corners.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}