import { useState, useCallback } from 'react';
import { coversAPI } from '../services/api';

export const useCovers = () => {
  const [covers, setCovers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCovers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await coversAPI.getAll();
      setCovers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching covers');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCover = useCallback(async (coverData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await coversAPI.create(coverData);
      setCovers(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating cover');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCover = useCallback(async (id, coverData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await coversAPI.update(id, coverData);
      setCovers(prev => prev.map(cover => 
        cover._id === id ? response.data : cover
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating cover');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCover = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await coversAPI.delete(id);
      setCovers(prev => prev.filter(cover => cover._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting cover');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    covers,
    loading,
    error,
    fetchCovers,
    createCover,
    updateCover,
    deleteCover,
  };
};