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
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Bienvenido al foro estudiantil de la FISI</h2>
        <input
          type="email"
          placeholder="Correo institucional (opcional)"
          className="border mb-4 p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Contraseña (opcional)"
          className="border mb-4 p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Acceder</button>
      </form>
    </div>
  );
};

export default Login;
