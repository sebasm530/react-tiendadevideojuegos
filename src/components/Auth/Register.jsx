import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    clave: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validations
    if (formData.clave !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.clave.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        nombre: formData.nombre,
        email: formData.email,
        clave: formData.clave
      });

      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle different types of errors
      if (err.response?.status === 400) {
        setError('Ya existe un usuario con este email o datos inválidos');
      } else if (err.response?.status === 500) {
        setError('Error en el servidor. Inténtalo más tarde.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === 'NETWORK_ERROR') {
        setError('Error de conexión. Asegúrate de que el servidor esté ejecutándose.');
      } else {
        setError('Error al registrarse. Verifica tus datos e inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-wrap">
      <div className="main-card" style={{ maxWidth: '450px' }}>
        <h2 className="title">Crear Cuenta</h2>
        <p className="subtitle">Únete al mundo del gaming</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              className="form-input"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="clave"
              className="form-input"
              placeholder="Contraseña (mín. 6 caracteres)"
              value={formData.clave}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn primary w-full"
            disabled={loading}
            style={{ marginTop: '6px' }}
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        {error && <div className="error-message mt-4">{error}</div>}
        {success && <div className="success-message mt-4">{success}</div>}

        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)'
        }}>
          <p style={{ 
            color: 'var(--muted)', 
            fontSize: '14px',
            margin: '0 0 8px 0'
          }}>
            ¿Ya tienes cuenta?
          </p>
          <Link 
            to="/login" 
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Iniciar sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;