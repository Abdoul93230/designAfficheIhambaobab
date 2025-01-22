import React from 'react';

export default function PromoTemplate1({ title = "Soldes d'Été", discount = "50%", endDate = "31 août" }) {
  return (
    <div className="relative w-[600px] h-[600px] bg-gradient-to-br from-purple-600 to-blue-500 p-8 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Cercles décoratifs */}
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white opacity-10 rounded-full" />
      <div className="absolute bottom-[-30px] left-[-30px] w-[150px] h-[150px] bg-white opacity-10 rounded-full" />
      
      {/* Contenu principal */}
      <div className="text-center z-10">
        <div className="mb-4 text-sm tracking-widest uppercase">Offre exclusive</div>
        <h1 className="text-6xl font-bold mb-6">{title}</h1>
        <div className="text-8xl font-black mb-6 text-yellow-300">-{discount}</div>
        <div className="text-xl mb-8">sur toute la collection</div>
        <div className="bg-white text-purple-600 py-3 px-8 rounded-full text-lg font-semibold inline-block
                      transform hover:scale-105 transition-transform cursor-pointer">
          Shop Now
        </div>
        <div className="mt-8 text-sm">Jusqu'au {endDate}</div>
      </div>
    </div>
  );
}