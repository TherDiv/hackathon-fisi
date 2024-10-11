// src/components/NavigationButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Elimina el estado de autenticación
    navigate('/'); // Redirige al usuario al inicio de sesión (login)
  };

  return (
    <div className="fixed top-0 left-0 pl-2 pr-2 w-full bg-sky-700 text-white shadow-md z-50 flex justify-between items-center" style={{ height: '70px' }}>
      {/* Título Foro FISI alineado a la izquierda */}
      <h1 className="text-2xl font-bold ml-4">Foro FISI</h1>
      
      {/* Secciones alineadas a la derecha */}
      <div className="flex space-x-0 mr-4 h-full">
        {/* Notificaciones */}
        <button className="hover:bg-sky-800 p-4 w-auto h-full flex items-center justify-center transition-all ease-in-out duration-200">
          Notificaciones
        </button>

        {/* Cerrar sesión */}
        <button onClick={handleLogout} className="hover:bg-sky-800 p-4 w-auto h-full flex items-center justify-center transition-all ease-in-out duration-200">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default NavigationButton;
