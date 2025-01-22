import { Link } from 'react-router-dom';
import { HomeIcon, PencilSquareIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">AdManager</span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <HomeIcon className="h-5 w-5 mr-1" />
              <span>Accueil</span>
            </Link>
            <Link to="/editor" className="flex items-center text-gray-600 hover:text-gray-900">
              <PencilSquareIcon className="h-5 w-5 mr-1" />
              <span>Créer</span>
            </Link>
            <Link to="/calendar" className="flex items-center text-gray-600 hover:text-gray-900">
              <CalendarIcon className="h-5 w-5 mr-1" />
              <span>Calendrier</span>
            </Link>
            <Link to="/library" className="flex items-center text-gray-600 hover:text-gray-900">
              <BookOpenIcon className="h-5 w-5 mr-1" />
              <span>Bibliothèque</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}