// src/components/NavigationButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-900 text-white p-4 shadow-md z-50 flex justify-between items-center">
      {/* Título Foro FISI alineado a la izquierda */}
      <h1 className="text-2xl font-bold">Foro FISI</h1>
      
      {/* Secciones alineadas a la derecha */}
      <div className="flex space-x-4">
        {/* Notificaciones */}
        <button className="hover:bg-blue-700 p-2 rounded">
          Notificaciones
        </button>

        {/* Cerrar sesión */}
        <button onClick={handleLogout} className="hover:bg-blue-700 p-2 rounded">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default NavigationButton;
