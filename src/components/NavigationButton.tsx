// src/components/NavigationButton.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    if (location.pathname === '/agregar') {
      navigate('/'); // Navegar a la página principal si estás en agregar
    } else {
      navigate('/agregar'); // Navegar a agregar pregunta si estás en la página principal
    }
  };

  return (
    <button
      onClick={handleNavigation}
      className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
    >
      {location.pathname === '/agregar' ? 'Volver' : 'Realizar Pregunta'}
    </button>
  );
};

export default NavigationButton;
