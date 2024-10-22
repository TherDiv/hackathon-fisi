// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TemaLista from './components/TemaLista';
import AgregarPregunta from './components/AgregarPregunta';
import AgregarRespuesta from './components/AgregarRespuesta'; 
import NavigationButton from './components/NavigationButton';
import Modal from './components/Modal';
import Login from './components/Login';
import Register from './components/Register';
import Chatbot from './components/Chatbot';
import PaginaFisi from './components/PaginaFisi';
import { Tema } from './types';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [temas, setTemas] = useState<Tema[]>([
    {
      id: 1,
      titulo: '¿Cuándo será el próximo proceso de matrícula?',
      autor: 'Juan',
      fecha: '01/10/2024',
      contenido: 'Hola, alguien sabe cuándo empiezan las fechas de matrícula para el próximo ciclo? Escuché que cambiaron los plazos, pero no estoy seguro. Agradecería cualquier información, especialmente sobre las fechas y qué documentos necesito tener listos.',
      respuestas: [],
      topico: 'Matrícula'
    },
    {
      id: 2,
      titulo: '¿Cuáles son los requisitos para aplicar a una beca internacional?',
      autor: 'Vanessa',
      fecha: '02/10/2024',
      contenido: 'Hola a todos! Estoy interesada en aplicar a una beca internacional, pero no tengo muy claro por dónde empezar. ¿Alguien ya ha pasado por este proceso y me podría decir qué documentos piden y si hay algún requisito especial? Cualquier ayuda sería genial :)',
      respuestas: [],
      topico: 'Becas'
    },
    // Puedes seguir agregando más temas...
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const agregarTema = (nuevoTema: Tema) => {
    setTemas(prevTemas => [...prevTemas, nuevoTema]);
  };

  const agregarRespuesta = (temaId: number, respuesta: { autor: string; contenido: string }) => {
    setTemas(prevTemas =>
      prevTemas.map(tema =>
        tema.id === temaId
          ? { ...tema, respuestas: [...tema.respuestas, { id: Date.now(), ...respuesta }] }
          : tema
      )
    );
  };  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<PaginaFisi />} />

        {/* Ruta para el login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/foro" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* Nueva ruta para el registro */}
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/foro" replace /> : <Register />
          }
        />

        {/* Ruta para el foro estudiantil */}
        <Route
          path="/foro"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout setIsAuthenticated={setIsAuthenticated}>
                <div className="relative">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Preguntas del Foro</h1>
                    <button onClick={openModal} className="bg-sky-800 text-white px-4 py-2 rounded shadow-lg">
                      Añadir Pregunta
                    </button>
                  </div>
                  <TemaLista temas={temas} />
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <AgregarPregunta agregarTema={agregarTema} onClose={closeModal} />
                  </Modal>
                </div>
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta para ver el detalle de un tema */}
        <Route
          path="/tema/:temaId"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout setIsAuthenticated={setIsAuthenticated}>
                <RenderDetalleTema temas={temas} agregarRespuesta={agregarRespuesta} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

// Layout para páginas autenticadas: agrega el `Chatbot` y `NavigationButton`
const AuthenticatedLayout: React.FC<{ children: React.ReactNode; setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>> }> = ({ children, setIsAuthenticated }) => {
  return (
    <div className="container mx-auto p-6 pt-24 relative">
      <NavigationButton setIsAuthenticated={setIsAuthenticated} />
      {children}
      <Chatbot />
    </div>
  );
};

interface RenderDetalleTemaProps {
  temas: Tema[];
  agregarRespuesta: (temaId: number, respuesta: { autor: string; contenido: string }) => void;
}

const RenderDetalleTema: React.FC<RenderDetalleTemaProps> = ({ temas, agregarRespuesta }) => {
  const { temaId } = useParams<{ temaId: string }>();
  const tema = temas.find((t) => t.id === Number(temaId));
  const navigate = useNavigate();

  if (!tema) {
    return <div>No se encontró el tema.</div>;
  }

  const handleAgregarRespuesta = (respuesta: { autor: string; contenido: string }) => {
    agregarRespuesta(tema.id, respuesta);
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate('/foro')} className="bg-sky-700 text-white px-4 py-2 rounded mb-4 shadow-lg">
        Volver
      </button>
      <div className="p-4 border rounded-lg shadow-md mb-5">
        <h2 className="text-3xl font-bold">{tema.titulo}</h2>
        <p className="text-gray-600">
          Autor: {tema.autor} | Fecha: {tema.fecha}
        </p>
        <p className="mt-2">{tema.contenido}</p>

        <h3 className="font-bold text-lg mt-4">Respuestas:</h3>
        <div className="mt-2">
          {tema.respuestas.length === 0 ? (
            <p className="text-gray-500">No hay respuestas aún.</p>
          ) : (
            tema.respuestas.map((respuesta, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <p className="font-bold">{respuesta.autor}</p>
                <p>{respuesta.contenido}</p>
              </div>
            ))
          )}
        </div>
        <AgregarRespuesta onAgregarRespuesta={handleAgregarRespuesta} />
      </div>
    </div>
  );
};

export default App;
