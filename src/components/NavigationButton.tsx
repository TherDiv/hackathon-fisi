import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButton: React.FC = () => {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión

  const handleLogout = () => {
    // Elimina el estado de autenticación del localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('usuario_id'); // Si también estás usando usuario_id
    localStorage.removeItem('hash_id');    // Si también estás usando hash_id

    // Actualiza el estado de autenticación global, si estás usando uno (asegúrate de que se refleje)
    navigate('/login'); // Redirige al inicio de sesión
    window.location.reload(); // Forzar la recarga de la página para asegurarse de que la sesión se ha cerrado
  };

  return (
    <div 
      className="fixed top-0 left-0 pl-2 pr-2 w-full bg-sky-700 text-white shadow-md z-50 flex justify-between items-center" 
      style={{ height: '70px' }}
      aria-label="Barra de navegación"
    >
      {/* Título Foro FISI alineado a la izquierda */}
      <h1 className="text-2xl font-bold ml-4" aria-label="Título del foro">Foro FISI</h1>
      
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
          onClick={handleLogout} 
          className="hover:bg-sky-800 p-4 w-auto h-full flex items-center justify-center transition-all ease-in-out duration-200"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default NavigationButton;
