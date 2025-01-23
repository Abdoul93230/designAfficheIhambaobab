import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function PromoSection() {
  return (
    <div className="w-full max-w-2xl h-[600px] relative bg-gradient-to-br from-[#30A08B] to-[#B2905F] rounded-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B17236] opacity-20 rounded-full blur-2xl transform translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full blur-xl transform -translate-x-20 translate-y-20" />

      <div className="h-full flex flex-col items-center justify-center px-8 text-white relative">
        <ShoppingBag className="w-12 h-12 mb-6 animate-bounce" />

        <div className="text-sm font-medium tracking-wider uppercase mb-4 opacity-90">
          Offre spéciale
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          Découvrez IHamBaobab
        </h1>

        <p className="text-xl text-center mb-6 opacity-90">
          Votre marketplace africaine
        </p>

        <div className="text-7xl font-black mb-8 text-white">-30%</div>

        <button className="group flex items-center gap-2 bg-white text-[#30A08B] py-4 px-8 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:bg-[#B17236] hover:text-white">
          Acheter maintenant
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-8 text-sm opacity-75">
          Valable jusqu'au 31 janvier
        </div>
      </div>
    </div>
  );
}
