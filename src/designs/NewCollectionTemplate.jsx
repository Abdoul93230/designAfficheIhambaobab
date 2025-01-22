import React from 'react';

export default function NewCollectionTemplate({ 
  season = "AUTOMNE", 
  year = "2024",
  imageUrl = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600"
}) {
  return (
    <div className="relative w-[600px] h-[600px] bg-gray-100 overflow-hidden">
      {/* Image de fond */}
      <img 
        src={imageUrl} 
        alt="Collection" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      
      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <div className="relative">
          <div className="text-white">
            <div className="text-sm tracking-[0.3em] mb-2">NOUVELLE COLLECTION</div>
            <h1 className="text-7xl font-light mb-3">{season}</h1>
            <h2 className="text-8xl font-bold mb-6">{year}</h2>
            <div className="h-[1px] w-16 bg-white mb-6" />
            <button className="border border-white text-white py-3 px-8 tracking-wider
                           hover:bg-white hover:text-black transition-colors">
              DÉCOUVRIR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}