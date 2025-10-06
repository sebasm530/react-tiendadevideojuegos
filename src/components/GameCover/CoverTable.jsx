import React from 'react';

const CoverTable = ({ covers, onEdit, onDelete, loading }) => {
  const generateMiniature = (cover) => {
    if (cover.portadaSVG) {
      // Return the SVG with adjusted size for the table
      return cover.portadaSVG.replace(
        '<svg ',
        '<svg width="100" height="60" class="miniatura" '
      );
    }
    
    // Fallback miniature generation
    return `<svg class="miniatura" viewBox="1 2 26 14" width="100" height="60" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="2" width="26" height="12" fill="${cover.fondoColor || '#000'}" />
      <circle cx="4" cy="12" r="1.5" fill="${cover.joystickBaseColor || '#000'}" />
      <rect x="3.8" y="9" width="0.4" height="2.5" fill="${cover.joystickStickColor || '#000'}" />
      <circle cx="4" cy="12" r="0.4" fill="${cover.joystickInnerColor || '#fff'}" />
      <rect x="19" y="11" width="2" height="3" fill="${cover.personajeCuerpoColor || '#000'}" />
      <circle cx="20" cy="10" r="0.9" fill="${cover.personajeCabezaColor || '#000'}" />
    </svg>`;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div className="loading" style={{ 
          width: '40px', 
          height: '40px', 
          borderColor: 'var(--accent)', 
          borderTopColor: 'transparent' 
        }}></div>
        <p style={{ marginTop: '16px', color: 'var(--muted)' }}>Cargando portadas...</p>
      </div>
    );
  }

  if (!covers || covers.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: 'var(--shadow)'
      }}>
        <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
          No hay portadas creadas aún. ¡Crea tu primera portada!
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '16px', 
      boxShadow: 'var(--shadow)',
      overflow: 'hidden'
    }}>
      <div style={{ 
        padding: '20px',
        borderBottom: '1px solid var(--border)'
      }}>
        <h3 style={{ margin: 0, color: 'var(--text)' }}>Mis Portadas</h3>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--page-bg)' }}>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left',
                fontWeight: '600',
                color: 'var(--text)',
                borderBottom: '1px solid var(--border)'
              }}>
                Miniatura
              </th>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left',
                fontWeight: '600',
                color: 'var(--text)',
                borderBottom: '1px solid var(--border)'
              }}>
                Fecha
              </th>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left',
                fontWeight: '600',
                color: 'var(--text)',
                borderBottom: '1px solid var(--border)'
              }}>
                Creador
              </th>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left',
                fontWeight: '600',
                color: 'var(--text)',
                borderBottom: '1px solid var(--border)'
              }}>
                Precio
              </th>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'center',
                fontWeight: '600',
                color: 'var(--text)',
                borderBottom: '1px solid var(--border)'
              }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {covers.map((cover, index) => (
              <tr key={cover._id || index} style={{ 
                borderBottom: index < covers.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <td style={{ padding: '12px 16px' }}>
                  <div 
                    style={{ 
                      width: '100px', 
                      height: '60px',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    dangerouslySetInnerHTML={{ __html: generateMiniature(cover) }}
                  />
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text)' }}>
                  {new Date(cover.fechaCreacion || Date.now()).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text)' }}>
                  {cover.creador?.nombre || cover.creador?.correo || 'Desconocido'}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text)' }}>
                  {cover.price != null ? `$${Number(cover.price).toFixed(2)}` : '-'}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button
                      className="btn ghost"
                      onClick={() => onEdit(cover)}
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '12px',
                        minWidth: 'auto'
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn"
                      onClick={() => onDelete(cover._id)}
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '12px',
                        background: '#ef4444',
                        color: 'white',
                        minWidth: 'auto'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoverTable;