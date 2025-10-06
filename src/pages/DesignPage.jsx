import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoverDesigner from '../components/GameCover/CoverDesigner';
import CoverTable from '../components/GameCover/CoverTable';
import { useCovers } from '../hooks/useCovers';

const DesignPage = () => {
  const [editingCover, setEditingCover] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { covers, loading, error, fetchCovers, createCover, updateCover, deleteCover } = useCovers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCovers();
  }, [fetchCovers]);

  const handleSave = async (coverData) => {
    try {
      if (isEditing && editingCover) {
        await updateCover(editingCover._id, coverData);
        setIsEditing(false);
        setEditingCover(null);
      } else {
        await createCover(coverData);
      }
    } catch (error) {
      console.error('Error saving cover:', error);
    }
  };

  const handleEdit = (cover) => {
    setEditingCover(cover);
    setIsEditing(true);
    // Scroll to top to show the designer
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (coverId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta portada?')) {
      try {
        await deleteCover(coverId);
      } catch (error) {
        console.error('Error deleting cover:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingCover(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--page-bg)',
      paddingBottom: '40px'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            margin: 0,
            color: 'var(--text)',
            fontSize: '1.8rem',
            fontWeight: 800
          }}>
            Diseñador de Portadas
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn ghost"
              onClick={() => navigate('/carousel')}
            >
              Ver Carrusel
            </button>
            <button 
              className="btn ghost"
              onClick={() => navigate('/')}
            >
              Menú Principal
            </button>
          </div>
        </div>
      </div>

      {/* Designer Section */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: 'var(--shadow)',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          {isEditing && (
            <div style={{
              background: 'var(--accent)',
              color: 'white',
              padding: '12px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: '600' }}>
                Editando portada
              </span>
              <button
                onClick={handleCancelEdit}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.5)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Cancelar
              </button>
            </div>
          )}
          
          <CoverDesigner
            onSave={handleSave}
            initialCover={editingCover}
            isEditing={isEditing}
          />
        </div>

        {/* Table Section */}
        <CoverTable
          covers={covers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {error && (
          <div className="error-message" style={{ marginTop: '20px' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignPage;