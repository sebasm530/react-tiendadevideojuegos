import React, { useEffect } from 'react';
import GameCard from './GameCard';
import { useCovers } from '../../hooks/useCovers';

const GameCarousel = () => {
  const { covers, loading, error, fetchCovers } = useCovers();

  useEffect(() => {
    fetchCovers();
  }, [fetchCovers]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <div className="loading" style={{ 
          width: '40px', 
          height: '40px', 
          borderColor: 'var(--accent)', 
          borderTopColor: 'transparent' 
        }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message" style={{ margin: '20px' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      background: '#f7f8fa',
      minHeight: '100vh',
      paddingBottom: '40px'
    }}>
      {/* Header */}
      <div style={{
        margin: 0,
        padding: '2.5rem 0 1.5rem 0',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#232946',
          fontSize: '2.2rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          margin: 0,
          textShadow: '0 2px 12px rgba(108,99,255,0.06)'
        }}>
          Carrusel de Portadas
        </h1>
      </div>

      {/* Carousel */}
      <div style={{
        display: 'flex',
        gap: '32px',
        overflowX: 'auto',
        padding: '24px 20px 32px 20px',
        justifyContent: covers.length <= 3 ? 'center' : 'flex-start',
        alignItems: 'flex-start'
      }}>
        {covers.length === 0 ? (
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '18px',
            boxShadow: '0 2px 12px rgba(60,72,88,0.07)',
            margin: '0 20px'
          }}>
            <h3 style={{ 
              color: 'var(--text)', 
              marginBottom: '12px',
              fontSize: '1.2rem'
            }}>
              No hay portadas para mostrar
            </h3>
            <p style={{ 
              color: 'var(--muted)',
              marginBottom: '20px'
            }}>
              ¡Crea tu primera portada en el diseñador!
            </p>
            <button 
              className="btn primary"
              onClick={() => window.location.href = '/design'}
            >
              Ir al Diseñador
            </button>
          </div>
        ) : (
          covers.map((cover) => (
            <GameCard key={cover._id} cover={cover} />
          ))
        )}
      </div>

      {/* Navigation Button */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px' 
      }}>
        <button 
          className="btn primary"
          onClick={() => window.location.href = '/design'}
          style={{ 
            padding: '10px 24px', 
            fontSize: '1.1em'
          }}
        >
          Ir al Diseñador
        </button>
      </div>
    </div>
  );
};

export default GameCarousel;