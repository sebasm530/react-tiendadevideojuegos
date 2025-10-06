import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsPage() {
  const navigate = useNavigate();

  return React.createElement('div', { className: 'center-wrap' },
    React.createElement('div', { className: 'main-card' },
      React.createElement('h1', { className: 'title' }, 'Página de Resultados'),
      React.createElement('p', { className: 'subtitle' },
        'Esta sección estará disponible próximamente con estadísticas y análisis de tus portadas.'
      ),
        
      React.createElement('div', { 
        style: { 
          background: 'var(--page-bg)',
          padding: '20px',
          borderRadius: '12px',
          margin: '20px 0'
        }
      },
        React.createElement('h3', { 
          style: { 
            margin: '0 0 12px 0',
            color: 'var(--text)',
            fontSize: '16px'
          }
        }, 'Funcionalidades próximas:'),
        React.createElement('ul', { 
          style: { 
            margin: 0,
            paddingLeft: '20px',
            color: 'var(--muted)',
            fontSize: '14px'
          }
        },
          React.createElement('li', null, 'Estadísticas de portadas creadas'),
          React.createElement('li', null, 'Análisis de colores más utilizados'),
          React.createElement('li', null, 'Ranking de portadas populares'),
          React.createElement('li', null, 'Exportación de diseños'),
          React.createElement('li', null, 'Compartir portadas en redes sociales')
        )
      ),

      React.createElement('div', { className: 'actions' },
        React.createElement('button', { 
          className: 'btn ghost',
          onClick: function() { navigate('/design'); }
        }, 'Ir al Diseñador'),
        React.createElement('button', { 
          className: 'btn ghost',
          onClick: function() { navigate('/carousel'); }
        }, 'Ver Carrusel'),
        React.createElement('button', { 
          className: 'btn primary',
          onClick: function() { navigate('/'); }
        }, 'Menú Principal')
      )
    )
  );
}

export default ResultsPage;