import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async function(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.login({
        email: email,
        clave: password
      });

      const token = response.data.token;
      login(token);
      setSuccess('¡Inicio de sesión exitoso!');
      
      setTimeout(function() {
        navigate('/design');
      }, 1000);
      
    } catch (err) {
      setError((err.response && err.response.data && err.response.data.error) || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', { className: 'center-wrap' },
    React.createElement('div', { className: 'main-card', style: { maxWidth: '400px' } },
      React.createElement('h2', { className: 'title' }, 'Login'),
      
      React.createElement('form', { 
        onSubmit: handleSubmit, 
        style: { display: 'grid', gap: '12px' } 
      },
        React.createElement('div', { className: 'form-group' },
          React.createElement('input', {
            type: 'email',
            className: 'form-input',
            placeholder: 'Correo electrónico',
            value: email,
            onChange: function(e) { setEmail(e.target.value); },
            required: true
          })
        ),
        
        React.createElement('div', { className: 'form-group' },
          React.createElement('input', {
            type: 'password',
            className: 'form-input',
            placeholder: 'Contraseña',
            value: password,
            onChange: function(e) { setPassword(e.target.value); },
            required: true
          })
        ),
        
        React.createElement('button', {
          type: 'submit',
          className: 'btn primary w-full',
          disabled: loading,
          style: { marginTop: '6px' }
        },
          loading ? 
            [React.createElement('span', { key: 'loading', className: 'loading' }), 'Iniciando sesión...'] :
            'Inicia en el mundo del gaming'
        )
      ),

      error && React.createElement('div', { className: 'error-message mt-4' }, error),
      success && React.createElement('div', { className: 'success-message mt-4' }, success),

      React.createElement('div', { 
        style: { 
          textAlign: 'center', 
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)'
        }
      },
        React.createElement('p', { 
          style: { 
            color: 'var(--muted)', 
            fontSize: '14px',
            margin: '0 0 8px 0'
          }
        }, '¿No tienes cuenta?'),
        React.createElement(Link, { 
          to: '/register',
          style: {
            color: 'var(--accent)',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px'
          }
        }, 'Regístrate aquí')
      )
    )
  );
}

export default Login;