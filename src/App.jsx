import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DesignPage from './pages/DesignPage';
import CarouselPage from './pages/CarouselPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return React.createElement(AuthProvider, null,
    React.createElement(Router, null,
      React.createElement('div', { className: 'App' },
        React.createElement(Routes, null,
          // Public routes
          React.createElement(Route, { path: '/login', element: React.createElement(LoginPage, null) }),
          React.createElement(Route, { path: '/register', element: React.createElement(RegisterPage, null) }),
          
          // Protected routes
          React.createElement(Route, { 
            path: '/', 
            element: React.createElement(ProtectedRoute, null,
              React.createElement(HomePage, null)
            )
          }),
          React.createElement(Route, { 
            path: '/design', 
            element: React.createElement(ProtectedRoute, null,
              React.createElement(DesignPage, null)
            )
          }),
          React.createElement(Route, { 
            path: '/carousel', 
            element: React.createElement(ProtectedRoute, null,
              React.createElement(CarouselPage, null)
            )
          }),
          React.createElement(Route, { 
            path: '/results', 
            element: React.createElement(ProtectedRoute, null,
              React.createElement(ResultsPage, null)
            )
          }),
          
          // Catch all route
          React.createElement(Route, { path: '*', element: React.createElement(Navigate, { to: '/', replace: true }) })
        )
      )
    )
  );
}

export default App;
