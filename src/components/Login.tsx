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
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Definir el tipo de respuesta que esperamos
      const response = await axios.post<LoginResponse>('https://vercel-backend-flame.vercel.app/api/mysqlManager/login', {
        correo,
        contrasena,
      });

      // Verificar si la respuesta permite el acceso
      if (response.data.Acceso === 'Permitido') {
        // Guardar la autenticación en localStorage y actualizar el estado
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);

        // También puedes guardar el usuario_id o hash_id si lo necesitas en tu aplicación
        localStorage.setItem('usuario_id', response.data.usuario_id.toString());
        localStorage.setItem('hash_id', response.data.hash_id);

        // Redirigir al foro
        navigate('/foro', { replace: true });
      } else {
        setError('Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al procesar tu inicio de sesión. Intenta nuevamente.');
    }
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
            <input
              type="email"
              placeholder="Correo institucional"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="border p-2 w-full rounded"
              required
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
