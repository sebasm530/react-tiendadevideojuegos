import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute(props) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return React.createElement('div', { className: 'center-wrap' },
      React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', { 
          className: 'loading', 
          style: { 
            width: '40px', 
            height: '40px', 
            borderColor: 'var(--accent)', 
            borderTopColor: 'transparent' 
          } 
        }),
        React.createElement('p', { 
          style: { marginTop: '16px', color: 'var(--muted)' }
        }, 'Verificando autenticación...')
      )
    );
  }

  return isAuthenticated() ? props.children : React.createElement(Navigate, { to: '/login', replace: true });
}

export default ProtectedRoute;