// src/components/NavigationButton.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ setIsAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión

  const handleLogout = () => {
    // Elimina el modal de confirmación para reducir retrasos
    setShowModal(false);

    // Borra el estado de autenticación y redirige rápidamente
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('hash_id');
    setIsAuthenticated(false); // Actualizar el estado de autenticación

    // Redirige rápidamente y recarga para garantizar el cierre de sesión
    navigate('/login', { replace: true });
  };

  return (
    <div className="fixed top-0 left-0 pl-2 pr-2 w-full bg-sky-700 text-white shadow-md z-50 flex justify-between items-center" style={{ height: '70px' }}>
      <h1 className="text-2xl font-bold ml-4">Foro FISI</h1>
      
      <div className="flex space-x-0 mr-4 h-full">
        <button className="hover:bg-sky-800 p-4 w-auto h-full flex items-center justify-center transition-all ease-in-out duration-200">
          Notificaciones
        </button>
        
        <button onClick={() => setShowModal(true)} className="hover:bg-sky-800 p-4 w-auto h-full flex items-center justify-center transition-all ease-in-out duration-200">
          Cerrar sesión
        </button>
        
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="text-black text-center mb-4">¿Estás seguro que deseas cerrar sesión?</p>
              <div className="flex justify-around">
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800">
                  Sí
                </button>
                <button onClick={() => setShowModal(false)} className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationButton;
