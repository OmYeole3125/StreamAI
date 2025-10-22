import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle, FaFire, FaTv } from "react-icons/fa";

const ContinueWatching = () => {
  const continueWatching = [
    {
      id: 1,
      title: "AI-Powered Gaming",
      img: "https://source.unsplash.com/600x400/?gaming,neon",
    },
    {
      id: 2,
      title: "Tech Talks Live",
      img: "https://source.unsplash.com/600x400/?technology,stream",
    },
    {
      id: 3,
      title: "AI Music Vibes",
      img: "https://source.unsplash.com/600x400/?music,concert",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16 bg-black/70">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaTv className="text-red-500" /> Continue Watching
      </h2>
      <div className="flex overflow-x-auto space-x-6 pb-3 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-800">
        {continueWatching.map((stream) => (
          <div
            key={stream.id}
            className="min-w-[300px] relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={stream.img}
              alt={stream.title}
              className="w-full h-52 object-cover group-hover:opacity-80 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center">
              <h3 className="text-xl font-bold mb-2">{stream.title}</h3>
              <button className="btn btn-sm bg-red-500 border-none hover:bg-red-600 rounded-full">
                <FaPlayCircle className="mr-2" /> Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatching;
