// src/components/NavigationButton.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('hash_id');
    setShowModal(false);
    navigate('/login');
    window.location.reload(); // Recarga para asegurarse de que se cierra la sesión
  };

  return (
    <div 
      className="fixed top-0 left-0 pl-2 pr-2 w-full bg-sky-700 text-white shadow-md z-50 flex justify-between items-center" 
      style={{ height: '70px' }}
      aria-label="Barra de navegación"
    >
      {/* Título Foro FISI alineado a la izquierda */}
      <h1 className="text-2xl font-bold ml-4">Foro FISI</h1>

      {/* Secciones alineadas a la derecha */}
      <div className="flex space-x-0 mr-4 h-full">
        {/* Notificaciones */}
        <button 
          className="hover:bg-sky-800 p-4 w-auto h-full flex items-center justify-center transition-all ease-in-out duration-200"
          aria-label="Ver notificaciones"
          onClick={() => alert('No tienes notificaciones nuevas')}
        >
          Notificaciones
        </button>

        {/* Cerrar sesión */}
        <button
          onClick={() => setShowModal(true)}
          className="hover:bg-sky-800 p-4 w-auto h-full flex items-center justify-center transition-all ease-in-out duration-200"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl mb-4">¿Estás seguro que deseas cerrar sesión?</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Sí, cerrar sesión
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationButton;
