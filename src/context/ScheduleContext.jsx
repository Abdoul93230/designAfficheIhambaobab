import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleContext = createContext(null);
const API_URL = 'http://localhost:5000/api';

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API_URL}/schedules`);
      setSchedules(response.data);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Erreur lors du chargement des planifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const addSchedule = async (newSchedule) => {
    try {
      const response = await axios.post(`${API_URL}/schedules`, newSchedule);
      setSchedules(prevSchedules => [...prevSchedules, response.data]);
      return response.data;
    } catch (err) {
      setErrorMessage('Erreur lors de l\'ajout de la planification');
      throw new Error('Erreur lors de l\'ajout de la planification');
    }
  };

  const updateSchedule = async (id, updatedSchedule) => {
    try {
      const response = await axios.put(`${API_URL}/schedules/${id}`, updatedSchedule);
      setSchedules(prevSchedules => 
        prevSchedules.map(schedule => 
          schedule._id === id ? response.data : schedule
        )
      );
      return response.data;
    } catch (err) {
      setErrorMessage('Erreur lors de la mise à jour de la planification');
      throw new Error('Erreur lors de la mise à jour de la planification');
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`${API_URL}/schedules/${id}`);
      setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule._id !== id));
    } catch (err) {
      setErrorMessage('Erreur lors de la suppression de la planification');
      throw new Error('Erreur lors de la suppression de la planification');
    }
  };

  const getSchedulesByDateRange = async (start, end) => {
    try {
      const response = await axios.get(`${API_URL}/schedules/range`, {
        params: { start, end }
      });
      return response.data;
    } catch (err) {
      setErrorMessage('Erreur lors de la récupération des planifications');
      throw new Error('Erreur lors de la récupération des planifications');
    }
  };

  const value = {
    schedules,
    loading,
    error: errorMessage,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getSchedulesByDateRange
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedules() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedules must be used within a ScheduleProvider');
  }
  return context;
}