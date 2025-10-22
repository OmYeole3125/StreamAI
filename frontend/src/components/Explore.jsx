import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle, FaFire, FaTv } from "react-icons/fa";

const Explore = () => {
  const liveStreams = [
    {
      id: 1,
      title: "Code with AI",
      viewers: "2.3K watching",
      img: "https://source.unsplash.com/600x400/?coding,computer",
    },
    {
      id: 2,
      title: "AI Fitness Trainer",
      viewers: "1.1K watching",
      img: "https://source.unsplash.com/600x400/?fitness,ai",
    },
    {
      id: 3,
      title: "Movie Talk Live",
      viewers: "3.5K watching",
      img: "https://source.unsplash.com/600x400/?movies,discussion",
    },
    {
      id: 4,
      title: "Gaming Legends",
      viewers: "5.7K watching",
      img: "https://source.unsplash.com/600x400/?esports,gaming",
    },
    {
      id: 5,
      title: "Art with AI",
      viewers: "876 watching",
      img: "https://source.unsplash.com/600x400/?digitalart,ai",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-black/80">
      <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
        <FaFire className="text-red-500" /> Explore Live Streams
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {liveStreams.map((stream) => (
          <div
            key={stream.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg bg-gray-900 hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          >
            <img
              src={stream.img}
              alt={stream.title}
              className="w-full h-56 object-cover group-hover:opacity-75 transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-xl font-bold mb-1">{stream.title}</h3>
              <p className="text-sm text-gray-400">{stream.viewers}</p>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/70 flex justify-center items-center">
              <button className="btn btn-sm bg-red-500 border-none hover:bg-red-600 rounded-full shadow-md">
                <FaPlayCircle className="mr-2" /> Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;
