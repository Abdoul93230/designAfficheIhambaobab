import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrashIcon, 
  FolderIcon,
  ListBulletIcon,
  Squares2X2Icon,
  EyeIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { useDesigns } from '../context/DesignContext';

export default function Library() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { designs, deleteDesign } = useDesigns();

  const categories = ['all', ...new Set(designs.map(design => design.category))];
  const filteredDesigns = selectedCategory === 'all' 
    ? designs 
    : designs.filter(design => design.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Bibliothèque</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <ListBulletIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Squares2X2Icon className="h-6 w-6" />
          </button>
          <Link
            to="/editor"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <CodeBracketIcon className="h-5 w-5 mr-2" />
            Nouveau design
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FolderIcon className="h-5 w-5 mr-2" />
              {category === 'all' ? 'Toutes les catégories' : category}
            </button>
          ))}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-48 overflow-hidden bg-gray-200 group">
                  <div className="transform scale-[0.4] origin-top-left translate-x-1/4">
                    <design.component />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <Link
                        to={`/design/${design.id}`}
                        className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                      >
                        <EyeIcon className="h-6 w-6" />
                      </Link>
                      <Link
                        to={`/editor/${design.id}`}
                        className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                      >
                        <CodeBracketIcon className="h-6 w-6" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{design.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{design.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      {new Date(design.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => deleteDesign(design.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 overflow-hidden bg-gray-200 rounded group">
                    <div className="transform scale-[0.13] origin-top-left">
                      <design.component />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{design.title}</h3>
                    <p className="text-sm text-gray-500">{design.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {new Date(design.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      to={`/design/${design.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/editor/${design.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <CodeBracketIcon className="h-5 w-5" />
                    </Link>
                    <button 
                      onClick={() => deleteDesign(design.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}