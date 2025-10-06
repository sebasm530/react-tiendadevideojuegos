import React from 'react';

const GameCard = ({ cover }) => {
  const generatePreview = (cover) => {
    if (cover.portadaSVG) {
      return cover.portadaSVG.replace(
        '<svg ',
        '<svg width="100%" height="150" style="border-radius: 12px; background: #f7f8fa; border: 1px solid #e3e6ec;" '
      );
    }
    
    // Fallback preview
    return `<svg width="100%" height="150" style="border-radius: 12px; background: #f7f8fa; border: 1px solid #e3e6ec;" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="29" height="19" fill="${cover.fondoColor || '#000'}" rx="1"/>
      <circle cx="5" cy="15" r="2" fill="${cover.joystickBaseColor || '#000'}" stroke="#ffffff" stroke-width="0.2"/>
      <rect x="4.6" y="11" width="0.8" height="4" fill="${cover.joystickStickColor || '#000'}" stroke="#ffffff" stroke-width="0.15"/>
      <circle cx="5" cy="15" r="0.5" fill="${cover.joystickInnerColor || '#fff'}"/>
      <circle cx="25" cy="15" r="1.5" fill="${cover.personajeCabezaColor || '#000'}" stroke="#ffffff" stroke-width="0.2"/>
      <rect x="24.5" y="16.5" width="1" height="3" fill="${cover.personajeCuerpoColor || '#000'}" stroke="#ffffff" stroke-width="0.15"/>
      <rect x="23.5" y="17" width="1" height="0.5" fill="${cover.brazoIzqColor || '#000'}" stroke="#ffffff" stroke-width="0.1"/>
      <rect x="25.5" y="17" width="1" height="0.5" fill="${cover.brazoDerColor || '#000'}" stroke="#ffffff" stroke-width="0.1"/>
    </svg>`;
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e3e6ec',
      borderRadius: '18px',
      boxShadow: '0 2px 12px rgba(60,72,88,0.07)',
      padding: '22px 18px 18px 18px',
      minWidth: '270px',
      maxWidth: '290px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}>
      {/* Game Cover Preview */}
      <div style={{
        width: '100%',
        height: '150px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7f8fa',
        border: '1px solid #e3e6ec',
        marginBottom: '10px',
        overflow: 'hidden'
      }}>
        <div 
          style={{ width: '100%', height: '100%' }}
          dangerouslySetInnerHTML={{ __html: generatePreview(cover) }}
        />
      </div>

      {/* Creator Name */}
      <h3 style={{
        margin: 0,
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#232946'
      }}>
        {cover.creador?.nombre || cover.creador?.correo || 'Creador Anónimo'}
      </h3>

      {/* Metadata */}
      <p style={{
        margin: 0,
        fontSize: '0.98rem',
        color: '#8a94a6'
      }}>
        {new Date(cover.fechaCreacion || Date.now()).toLocaleDateString('es-ES')}
      </p>

      {/* Price */}
      {cover.price != null && (
        <p style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: 700,
          color: '#6c63ff'
        }}>
          ${Number(cover.price).toFixed(2)} USD
        </p>
      )}

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '8px',
        width: '100%'
      }}>
        <button 
          className="btn ghost"
          style={{ 
            flex: 1,
            padding: '8px 12px',
            fontSize: '13px'
          }}
        >
          Ver Detalles
        </button>
        <button 
          className="btn primary"
          style={{ 
            flex: 1,
            padding: '8px 12px',
            fontSize: '13px'
          }}
        >
          Favorito
        </button>
      </div>
    </div>
  );
};

export default GameCard;