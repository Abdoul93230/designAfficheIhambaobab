import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, PencilSquareIcon, CalendarIcon, BookOpenIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">AdManager</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
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
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}