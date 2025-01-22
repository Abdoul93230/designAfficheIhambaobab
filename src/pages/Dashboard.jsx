import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Créations récentes</h2>
          <div className="space-y-4">
            {/* Liste des créations récentes */}
            <p className="text-gray-600">Aucune création récente</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Publications à venir</h2>
          <div className="space-y-4">
            {/* Liste des publications planifiées */}
            <p className="text-gray-600">Aucune publication planifiée</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
          <div className="space-y-4">
            <Link
              to="/editor"
              className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Nouvelle création
            </Link>
            <Link
              to="/calendar"
              className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Planifier une publication
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}