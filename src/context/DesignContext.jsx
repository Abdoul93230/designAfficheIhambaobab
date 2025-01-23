import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PromoTemplate1 from '../designs/PromoTemplate1';
import NewCollectionTemplate from '../designs/NewCollectionTemplate';
import LimitedOfferTemplate from '../designs/LimitedOfferTemplate';
import EventTemplate from '../designs/EventTemplate';

const DesignContext = createContext(null);
const API_URL = 'http://localhost:5000/api';

const templateComponents = {
  'PromoTemplate1': PromoTemplate1,
  'NewCollectionTemplate': NewCollectionTemplate,
  'LimitedOfferTemplate': LimitedOfferTemplate,
  'EventTemplate': EventTemplate
};

export function DesignProvider({ children }) {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDesigns = async () => {
    try {
      const response = await axios.get(`${API_URL}/designs`);
      const designsWithComponents = response.data.map(design => ({
        ...design,
        component: templateComponents[design.componentName] || PromoTemplate1
      }));
      setDesigns(designsWithComponents);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Erreur lors du chargement des designs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const addDesign = async (newDesign) => {
    try {
      const designData = {
        title: newDesign.title,
        description: newDesign.description,
        category: newDesign.category,
        code: newDesign.code,
        componentName: newDesign.componentName || 'PromoTemplate1'
      };

      const response = await axios.post(`${API_URL}/designs`, designData);
      const savedDesign = {
        ...response.data,
        component: templateComponents[designData.componentName]
      };
      
      setDesigns(prevDesigns => [...prevDesigns, savedDesign]);
      return savedDesign;
    } catch (err) {
      setErrorMessage('Erreur lors de l\'ajout du design');
      throw new Error('Erreur lors de l\'ajout du design');
    }
  };

  const updateDesign = async (id, updatedDesign) => {
    try {
      const designData = {
        title: updatedDesign.title,
        description: updatedDesign.description,
        category: updatedDesign.category,
        code: updatedDesign.code,
        componentName: updatedDesign.componentName
      };

      const response = await axios.put(`${API_URL}/designs/${id}`, designData);
      const updated = {
        ...response.data,
        component: templateComponents[designData.componentName]
      };

      setDesigns(prevDesigns => 
        prevDesigns.map(design => 
          design._id === id ? updated : design
        )
      );
      return updated;
    } catch (err) {
      setErrorMessage('Erreur lors de la mise à jour du design');
      throw new Error('Erreur lors de la mise à jour du design');
    }
  };

  const deleteDesign = async (id) => {
    try {
      await axios.delete(`${API_URL}/designs/${id}`);
      setDesigns(prevDesigns => prevDesigns.filter(design => design._id !== id));
    } catch (err) {
      setErrorMessage('Erreur lors de la suppression du design');
      throw new Error('Erreur lors de la suppression du design');
    }
  };

  const getDesignById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/designs/${id}`);
      return {
        ...response.data,
        component: templateComponents[response.data.componentName]
      };
    } catch (err) {
      setErrorMessage('Erreur lors de la récupération du design');
      throw new Error('Erreur lors de la récupération du design');
    }
  };

  const value = {
    designs,
    loading,
    error: errorMessage,
    addDesign,
    updateDesign,
    deleteDesign,
    getDesignById
  };

  return (
    <DesignContext.Provider value={value}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesigns() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesigns must be used within a DesignProvider');
  }
  return context;
}