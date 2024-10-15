import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Definir la estructura esperada en la respuesta del servidor
interface LoginResponse {
  Acceso: string;
  contrasena: string;
  hash_id: string;
  usuario_id: number;
}

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');  // No requerimos que se ingrese
  const [contrasena, setContrasena] = useState('');  // No requerimos que se ingrese
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Permitir iniciar sesión sin ingresar datos
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    localStorage.setItem('usuario_id', '123'); // ID ficticio
    localStorage.setItem('hash_id', 'dummyHash'); // Hash ficticio
    navigate('/foro', { replace: true });
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Fondo difuminado y oscurecido */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/san-marcos-2.png')`,
          filter: 'blur(0px)',
          zIndex: -1,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>

      {/* Enlace Volver */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-white underline hover:text-blue-200">
          Volver
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg flex" style={{ width: '700px', height: '500px' }}>
        <div className="hidden md:block w-2/5">
          <img src="/images/login.png" alt="FISI" className="w-50 h-50 object-contain rounded-l-lg" />
        </div>

        {/* Formulario de inicio de sesión */}
        <div className="w-full md:w-3/5 flex flex-col justify-center p-8">
          <div className="flex justify-center">
            <img src="/images/logo-fisi.png" alt="Logo FISI" className="w-50 h-50 object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Bienvenido al foro de la FISI</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Input de correo pero sin validación de contenido */}
            <input
              type="email"
              placeholder="Correo institucional (opcional)"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="border p-2 w-full rounded"
            />
            {/* Input de contraseña pero sin validación de contenido */}
            <input
              type="password"
              placeholder="Contraseña (opcional)"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-800 focus:outline-none">
                Acceder
              </button>
            </div>
          </form>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}

          <div className="text-center mt-4">
            <a href="#" className="text-blue-800 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          {/* Enlace para registrarse */}
          <div className="text-center mt-2">
            <p>¿No tienes cuenta?</p>
            <Link to="/register" className="text-blue-800 hover:underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
