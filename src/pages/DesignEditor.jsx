import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PlayIcon,
  DocumentDuplicateIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { useDesigns } from '../context/DesignContext';

const defaultCode = `export default function CustomDesign() {
  return (
    <div className="relative w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Mon Design</h1>
      <p className="text-xl">Description du design</p>
    </div>
  );
}`;

const previewTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;
    COMPONENT_CODE
    ReactDOM.render(<CustomDesign />, document.getElementById('root'));
  </script>
</body>
</html>
`;

export default function DesignEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDesignById, addDesign, updateDesign } = useDesigns();
  const [code, setCode] = useState(defaultCode);
  const [title, setTitle] = useState('Nouveau Design');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const loadDesign = async () => {
        try {
          const design = await getDesignById(id);
          if (design) {
            setCode(design.code);
            setTitle(design.title);
            setDescription(design.description);
            setCategory(design.category);
          }
        } catch (err) {
          setError("Erreur lors du chargement du design");
        }
      };
      loadDesign();
    }
  }, [id]);

  const handlePreview = () => {
    try {
      const previewFrame = document.getElementById('preview-frame');
      if (previewFrame) {
        const htmlContent = previewTemplate.replace('COMPONENT_CODE', code);
        previewFrame.srcdoc = htmlContent;
      }
      setError(null);
    } catch (err) {
      setError(`Erreur de prévisualisation: ${err.message}`);
    }
  };

  const handleSave = async () => {
    try {
      const designData = {
        title,
        description,
        category,
        code,
        componentName: 'CustomDesign'
      };

      if (id) {
        await updateDesign(id, designData);
      } else {
        await addDesign(designData);
      }

      navigate('/library');
    } catch (err) {
      setError(`Erreur lors de la sauvegarde: ${err.message}`);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  // Appeler handlePreview à chaque modification du code
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handlePreview();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/library')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
              placeholder="Nom du design"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-md ${
                previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <DevicePhoneMobileIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-md ${
                previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <ComputerDesktopIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Sauvegarder
            </button>
          </div>
        </div>

        {/* Formulaire des métadonnées */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Éditeur de code */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Code</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopyCode}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Copier le code"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handlePreview}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Actualiser l'aperçu"
                >
                  <PlayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[600px] font-mono text-sm p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellCheck="false"
              />
              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Aperçu */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
            <div className="flex justify-center items-center min-h-[600px] bg-gray-100 rounded-md">
              <div
                className={`relative ${
                  previewMode === 'mobile' ? 'transform scale-75' : ''
                }`}
              >
                <iframe
                  id="preview-frame"
                  title="preview"
                  className="w-[600px] h-[600px] border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}