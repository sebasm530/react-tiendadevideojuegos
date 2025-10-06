import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="center-wrap">
      <div className="main-card" role="navigation" aria-label="Navegación principal">
        <h1 className="title">Panel rápido</h1>
        <p className="subtitle">Accede a las secciones principales de la tienda</p>

        <div className="actions">
          <button 
            className="btn ghost w-full" 
            onClick={() => navigate('/carousel')}
          >
            Ir al carrusel
          </button>
          <button 
            className="btn ghost w-full" 
            onClick={() => navigate('/design')}
          >
            Ir gestión de portadas
          </button>
          <button 
            className="btn ghost w-full" 
            onClick={() => navigate('/results')}
          >
            Ir a resultados
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '20px',
          gap: '12px'
        }}>
          <p style={{ 
            fontSize: '13px',
            color: 'var(--muted)',
            margin: 0,
            flex: 1
          }}>
            Sesión activa
          </p>
          <button 
            className="btn"
            onClick={handleLogout}
            style={{ 
              background: '#ef4444',
              color: 'white',
              padding: '8px 16px',
              fontSize: '13px'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;