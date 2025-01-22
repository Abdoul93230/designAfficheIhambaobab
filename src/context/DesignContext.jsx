import React, { createContext, useContext, useState } from 'react';
import PromoTemplate1 from '../designs/PromoTemplate1';
import NewCollectionTemplate from '../designs/NewCollectionTemplate';
import LimitedOfferTemplate from '../designs/LimitedOfferTemplate';
import EventTemplate from '../designs/EventTemplate';

const DesignContext = createContext();

const initialDesigns = [
  {
    id: 1,
    title: 'Promo Template',
    component: PromoTemplate1,
    category: 'Promotions',
    createdAt: '2024-03-15',
    description: 'Template pour les promotions avec effets visuels',
    code: `import React from 'react';

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
}`
  },
  // ... autres designs initiaux
];

export function DesignProvider({ children }) {
  const [designs, setDesigns] = useState(initialDesigns);

  const addDesign = (newDesign) => {
    setDesigns(prevDesigns => [...prevDesigns, {
      ...newDesign,
      id: prevDesigns.length + 1,
      createdAt: new Date().toISOString()
    }]);
  };

  const updateDesign = (id, updatedDesign) => {
    setDesigns(prevDesigns => 
      prevDesigns.map(design => 
        design.id === id ? { ...design, ...updatedDesign } : design
      )
    );
  };

  const deleteDesign = (id) => {
    setDesigns(prevDesigns => prevDesigns.filter(design => design.id !== id));
  };

  const getDesignById = (id) => {
    return designs.find(design => design.id === parseInt(id));
  };

  return (
    <DesignContext.Provider value={{
      designs,
      addDesign,
      updateDesign,
      deleteDesign,
      getDesignById
    }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesigns() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesigns must be used within a DesignProvider');
  }
  return context;
}