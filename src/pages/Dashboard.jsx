import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDesigns } from '../context/DesignContext';
import { useSchedules } from '../context/ScheduleContext';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { designs, loading: designsLoading } = useDesigns();
  const { schedules, loading: schedulesLoading } = useSchedules();
  const [stats, setStats] = useState({
    totalDesigns: 0,
    scheduledPublications: 0,
    publishedDesigns: 0,
    upcomingPublications: 0
  });

  useEffect(() => {
    if (!designsLoading && !schedulesLoading) {
      const now = new Date();
      setStats({
        totalDesigns: designs.length,
        scheduledPublications: schedules.filter(s => s.status === 'scheduled').length,
        publishedDesigns: schedules.filter(s => s.status === 'published').length,
        upcomingPublications: schedules.filter(s => 
          new Date(s.startDate) > now && s.status === 'scheduled'
        ).length
      });
    }
  }, [designs, schedules, designsLoading, schedulesLoading]);

  const recentDesigns = designs.slice(0, 5);
  const upcomingSchedules = schedules
    .filter(s => new Date(s.startDate) > new Date() && s.status === 'scheduled')
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total des designs</p>
              <p className="text-2xl font-semibold">{stats.totalDesigns}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Publications planifiées</p>
              <p className="text-2xl font-semibold">{stats.scheduledPublications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Designs publiés</p>
              <p className="text-2xl font-semibold">{stats.publishedDesigns}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Publications à venir</p>
              <p className="text-2xl font-semibold">{stats.upcomingPublications}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Créations récentes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Créations récentes</h2>
          <div className="space-y-4">
            {recentDesigns.length > 0 ? (
              recentDesigns.map(design => (
                <Link
                  key={design._id}
                  to={`/design/${design._id}`}
                  className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{design.title}</h3>
                      <p className="text-sm text-gray-500">{design.category}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(design.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-600">Aucune création récente</p>
            )}
          </div>
        </div>

        {/* Publications à venir */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Publications à venir</h2>
          <div className="space-y-4">
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.map(schedule => (
                <div
                  key={schedule._id}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{schedule.title}</h3>
                      <p className="text-sm text-gray-500">
                        Design: {schedule.designId.title}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(schedule.startDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Aucune publication planifiée</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/editor"
            className="block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Nouvelle création
          </Link>
          <Link
            to="/calendar"
            className="block text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Planifier une publication
          </Link>
          <Link
            to="/library"
            className="block text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
          >
            Gérer la bibliothèque
          </Link>
        </div>
      </div>
    </div>
  );
}