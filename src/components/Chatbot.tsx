// src/components/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Autenticación sin validaciones, simplemente establece el estado como autenticado
    localStorage.setItem('isAuthenticated', 'true');
    // Redirigir al foro principal después de "iniciar sesión"
    navigate('/foro', { replace: true });
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/fondo.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Bienvenido al foro estudiantil de la FISI
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo institucional (opcional)"
            className="border p-2 w-full rounded"
          />
          <input
            type="password"
            placeholder="Contraseña (opcional)"
            className="border p-2 w-full rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
