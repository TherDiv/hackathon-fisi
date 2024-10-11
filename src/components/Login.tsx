// src/components/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Autenticación sin validaciones, simplemente establece el estado como autenticado
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true); // Actualizar el estado `isAuthenticated`
    // Redirigir al foro principal después de "iniciar sesión"
    navigate('/foro', { replace: true });
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Fondo difuminado y oscurecido */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/san-marcos-2.png')`,
          filter: 'blur(0px)',  // Efecto difuminado
          zIndex: -1,           // Asegurarse de que el fondo esté detrás de todo
          backgroundSize: 'cover',  // Para cubrir todo el fondo
          backgroundRepeat: 'no-repeat',  // Evitar repeticiones
        }}
      >
        {/* Capa oscura sobre el fondo */}
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>

      <div className="bg-white shadow-lg rounded-lg flex" style={{ width: '700px', height: '500px' }}>
        {/* Imagen al lado del login */}
        <div className="hidden md:block w-2/5">
          <img
            src="/images/login.png"
            alt="FISI"
            className="w-full h-full object-contain rounded-l-lg"
          />
        </div>

        {/* Formulario de inicio de sesión */}
        <div className="w-full md:w-3/5 flex flex-col justify-center p-8">
          {/* Nueva sección para la imagen del logo */}
          <div className="flex justify-center mb-0 mt-[-50px]">
            <img
              src="/images/logo-fisi.png"
              alt="Logo FISI"
              className="w-45 h-45 object-contain" // Puedes ajustar el tamaño a lo que prefieras
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Bienvenido al foro de la FISI</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Correo institucional"
              className="border p-2 w-full rounded"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border p-2 w-full rounded"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-800 focus:outline-none"
              >
                Acceder
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-800">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
