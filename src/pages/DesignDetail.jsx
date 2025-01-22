import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';
import PromoTemplate1 from '../designs/PromoTemplate1';
import NewCollectionTemplate from '../designs/NewCollectionTemplate';
import LimitedOfferTemplate from '../designs/LimitedOfferTemplate';
import EventTemplate from '../designs/EventTemplate';

const designComponents = {
  1: { component: PromoTemplate1, code: `import React from 'react';

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
}`},
  2: { component: NewCollectionTemplate, code: `import React from 'react';

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
}`},
  3: { component: LimitedOfferTemplate, code: `import React from 'react';

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
}`},
  4: { component: EventTemplate, code: `import React from 'react';

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
              top: \`\${Math.random() * 100}%\`,
              left: \`\${Math.random() * 100}%\`,
              transform: \`scale(\${Math.random() * 2 + 0.5})\`
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
}`}
};

export default function DesignDetail() {
  const { id } = useParams();
  const [showCode, setShowCode] = useState(false);
  
  const design = designComponents[id];
  if (!design) return <div>Design non trouvé</div>;
  
  const DesignComponent = design.component;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/library"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Retour à la bibliothèque
          </Link>
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center px-4 py-2 bg-white rounded-md shadow hover:bg-gray-50"
          >
            {showCode ? (
              <>
                <EyeIcon className="h-5 w-5 mr-2" />
                Voir l'aperçu
              </>
            ) : (
              <>
                <CodeBracketIcon className="h-5 w-5 mr-2" />
                Voir le code
              </>
            )}
          </button>
        </div>

        {showCode ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <pre className="language-javascript">
              <code className="text-sm">{design.code}</code>
            </pre>
          </div>
        ) : (
          <div className="flex justify-center items-center bg-white rounded-lg shadow-lg p-8">
            <DesignComponent />
          </div>
        )}
      </div>
    </div>
  );
}