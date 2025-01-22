import React from 'react';

export default function LimitedOfferTemplate({
  productName = "Premium Watch",
  price = "299€",
  originalPrice = "499€"
}) {
  return (
    <div className="relative w-[600px] h-[600px] bg-black flex items-center justify-center p-8">
      {/* Éléments de design */}
      <div className="absolute inset-8 border border-gold/30" />
      <div className="absolute inset-[2rem] border border-gold/20" />
      
      {/* Contenu principal */}
      <div className="text-center text-white z-10">
        <div className="text-gold uppercase tracking-[0.5em] mb-4">Édition Limitée</div>
        <h1 className="text-5xl font-light mb-6">{productName}</h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-4xl font-bold text-gold">{price}</span>
          <span className="text-xl text-gray-500 line-through">{originalPrice}</span>
        </div>
        
        <div className="space-y-2 mb-8">
          <div className="text-sm text-gray-400">Design exclusif</div>
          <div className="text-sm text-gray-400">Édition numérotée</div>
          <div className="text-sm text-gray-400">Garantie à vie</div>
        </div>
        
        <button className="bg-gold text-black py-3 px-12 tracking-wider
                        hover:bg-white transition-colors">
          RÉSERVER MAINTENANT
        </button>
      </div>
      
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent" />
    </div>
  );
}