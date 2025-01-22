import React from 'react';

export default function EventTemplate({
  eventName = "Festival de Jazz",
  date = "15-17 JUILLET",
  location = "PARIS"
}) {
  return (
    <div className="relative w-[600px] h-[600px] bg-indigo-900 overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-40 h-40 border border-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 2 + 0.5})`
            }}
          />
        ))}
      </div>
      
      {/* Contenu principal */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center text-white">
        <div className="text-sm tracking-[0.3em] text-indigo-300 mb-4">PRÉSENTE</div>
        
        <h1 className="text-6xl font-bold mb-6 leading-none">
          {eventName}
        </h1>
        
        <div className="w-16 h-[2px] bg-indigo-400 mb-6" />
        
        <div className="text-2xl font-light mb-2">{date}</div>
        <div className="text-xl mb-8">{location}</div>
        
        <div className="space-y-4">
          <button className="bg-white text-indigo-900 py-3 px-8 rounded-full
                         hover:bg-indigo-100 transition-colors">
            RÉSERVER VOS PLACES
          </button>
          <div className="text-sm text-indigo-300">Places limitées</div>
        </div>
      </div>
    </div>
  );
}