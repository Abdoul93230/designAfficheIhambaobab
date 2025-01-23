import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSchedules } from '../context/ScheduleContext';
import { useDesigns } from '../context/DesignContext';

export default function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState('');
  const { schedules, addSchedule, deleteSchedule, getSchedulesByDateRange } = useSchedules();
  const { designs } = useDesigns();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Convertir les planifications en événements pour le calendrier
    const calendarEvents = schedules.map(schedule => ({
      id: schedule._id,
      title: schedule.title,
      start: schedule.startDate,
      end: schedule.endDate,
      backgroundColor: schedule.status === 'published' ? '#10B981' : '#3B82F6',
      extendedProps: {
        designId: schedule.designId._id,
        status: schedule.status
      }
    }));
    setEvents(calendarEvents);
  }, [schedules]);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setShowModal(true);
  };

  const handleEventAdd = async (title, designId) => {
    if (selectedDate && title && designId) {
      try {
        const newSchedule = {
          title,
          designId,
          startDate: selectedDate,
          endDate: selectedDate,
          status: 'scheduled'
        };
        await addSchedule(newSchedule);
      } catch (error) {
        console.error('Error adding schedule:', error);
      }
    }
    setShowModal(false);
    setSelectedDate(null);
    setSelectedDesign('');
  };

  const handleEventClick = async (clickInfo) => {
    if (confirm('Voulez-vous supprimer cette planification ?')) {
      try {
        await deleteSchedule(clickInfo.event.id);
        clickInfo.event.remove();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Calendrier</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle publication
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          select={handleDateSelect}
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          locale="fr"
        />
      </div>

      {/* Modal de planification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Planifier une publication</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedDesign('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEventAdd(e.target.title.value, selectedDesign);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design
                </label>
                <select
                  value={selectedDesign}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Sélectionner un design</option>
                  {designs.map((design) => (
                    <option key={design._id} value={design._id}>
                      {design.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate || ''}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedDesign('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Planifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}