import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useDesigns } from '../context/DesignContext';

export default function DesignDetail() {
  const { id } = useParams();
  const [showCode, setShowCode] = useState(false);
  const { getDesignById } = useDesigns();
  const [design, setDesign] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDesign = async () => {
      try {
        const designData = await getDesignById(id);
        setDesign(designData);
      } catch (err) {
        setError("Design non trouvé");
      }
    };
    loadDesign();
  }, [id, getDesignById]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!design) return <div>Chargement...</div>;

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