// src/components/Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface RegisterResponse {
  estado: string; 
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [correo, setCorreo] = useState('');
  const [dni, setDni] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<RegisterResponse>(
        'https://vercel-backend-flame.vercel.app/api/mysqlManager/create-user',
        {
          codigo,
          correo,
          dni,
          contrasena
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data && response.data.estado === 'exito') {
        alert('Registro exitoso, por favor inicia sesión');
        navigate('/login', { replace: true });
      } else {
        setError('Error en el registro. Por favor, verifica los datos.');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setError('Ocurrió un error al procesar tu registro. Intenta nuevamente.');
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

      {/* Enlace Volver */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-white underline hover:text-blue-200">
          Volver
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg flex" style={{ width: '700px', height: '500px' }}>
        <div className="hidden md:block w-2/5">
          <img src="/images/login.png" alt="FISI" className="w-full h-full object-contain rounded-l-lg" />
        </div>

        {/* Formulario de registro */}
        <div className="w-full md:w-3/5 flex flex-col justify-center p-8">
          <div className="flex justify-center">
            <img src="/images/logo-fisi.png" alt="Logo FISI" className="w-50 h-50 object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Crea tu cuenta</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              id="codigo"
              name="codigo"
              placeholder="Código de estudiante"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="Correo institucional"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              id="dni"
              name="dni"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            {error && <p className="text-red-600 text-center">{error}</p>}
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-800 focus:outline-none"
              >
                Registrarse
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p>¿Ya tienes cuenta?</p>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-800 hover:underline"
            >
              Inicia sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
