// src/App.tsx
import React, { useState, useEffect } from 'react'; // Añadir `useEffect` aquí
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Importar `useParams` por separado
import TemaLista from './components/TemaLista';
import AgregarPregunta from './components/AgregarPregunta';
import AgregarRespuesta from './components/AgregarRespuesta'; 
import NavigationButton from './components/NavigationButton'; // Importar el componente del título fijo
import Modal from './components/Modal'; // Importar el componente Modal
import Login from './components/Login';
import Register from './components/Register'; // Importa el componente Register
import Chatbot from './components/Chatbot'; // La "C" debe ser mayúscula si el archivo es `Chatbot.tsx`
import PaginaFisi from './components/PaginaFisi'; // Importa la página principal
import { Tema } from './types';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [temas, setTemas] = useState<Tema[]>([
    {
      id: 1,
      titulo: "¿Cuándo será el próximo proceso de matrícula?",
      autor: "Juan",
      fecha: "01/10/2024",
      contenido:
        "Hola, alguien sabe cuándo empiezan las fechas de matrícula para el próximo ciclo? Escuché que cambiaron los plazos, pero no estoy seguro. Agradecería cualquier información, especialmente sobre las fechas y qué documentos necesito tener listos.",
      respuestas: [],
      topico: "Matrícula", // Añadir la propiedad `topico`
    },
    {
      id: 2,
      titulo:
        "¿Cuáles son los requisitos para aplicar a una beca internacional?",
      autor: "Vanessa",
      fecha: "02/10/2024",
      contenido:
        "Hola a todos! Estoy interesada en aplicar a una beca internacional, pero no tengo muy claro por dónde empezar. ¿Alguien ya ha pasado por este proceso y me podría decir qué documentos piden y si hay algún requisito especial? Cualquier ayuda sería genial :)",
      respuestas: [],
      topico: "Becas", // Añadir la propiedad `topico`
    },
    {
      id: 3,
      titulo: "¿Qué hacer si tengo que dar exámenes de aplazados?",
      autor: "Carlos",
      fecha: "03/10/2024",
      contenido:
        "Chicos, tengo que dar los exámenes de aplazados y la verdad estoy un poco perdido. ¿Alguien sabe cómo va eso? ¿Hay que inscribirse en algún sitio o simplemente aparecen las fechas en el sistema? Si alguno ha pasado por esto antes, agradecería sus consejos.",
      respuestas: [],
      topico: "Aplazados", // Añadir la propiedad `topico`
    },
    // Repite lo mismo para los demás objetos `Tema`...
    {
      id: 4,
      titulo: "¿Cómo puedo pedir una prórroga para la matrícula?",
      autor: "Ana",
      fecha: "04/10/2024",
      contenido:
        "El otro día me comentaron que se puede pedir una prórroga para la matrícula si uno tiene problemas para pagar a tiempo. ¿Alguien sabe cómo hacer esto? ¿Es complicado o te ponen muchas trabas? Cualquier experiencia que puedan compartir me sería muy útil!",
      respuestas: [],
      topico: "Matrícula", // Añadir la propiedad `topico`
    },
    {
      id: 5,
      titulo: "Documentos para la matrícula, ¿qué necesito exactamente?",
      autor: "María",
      fecha: "05/10/2024",
      contenido:
        "Hola, estoy tratando de organizarme para la matrícula, pero no estoy segura de qué documentos necesito tener listos. ¿Alguien tiene la lista completa o sabe si este año piden algo diferente? Prefiero estar preparada antes de que empiecen las fechas.",
      respuestas: [],
      topico: "Matrícula", // Añadir la propiedad `topico`
    },
    {
      id: 6,
      titulo: "¿Cómo se puede recuperar un curso aplazado?",
      autor: "Luis",
      fecha: "06/10/2024",
      contenido:
        "Alguien me puede ayudar con esto: ¿cómo es el proceso para recuperar un curso aplazado? Me dijeron que se puede volver a llevar el próximo ciclo, pero no sé si hay algún costo adicional o si tengo que hacer algún trámite especial antes. Cualquier dato me ayuda.",
      respuestas: [],
      topico: "Aplazados", // Añadir la propiedad `topico`
    },
    {
      id: 7,
      titulo:
        "¿Puedo cambiar la carga de cursos después de haberme matriculado?",
      autor: "Sofía",
      fecha: "07/10/2024",
      contenido:
        "Hola chicos, ¿saben si es posible cambiar los cursos después de hacer la matrícula? Me preocupa que me haya inscrito en demasiados créditos y no sé si aún puedo ajustar la carga antes de que empiece el ciclo. ¿Alguien ha hecho esto antes?",
      respuestas: [],
      topico: "Matrícula", // Añadir la propiedad `topico`
    },
    {
      id: 8,
      titulo: "Problemas para pagar la matrícula, ¿qué opciones hay?",
      autor: "Diego",
      fecha: "08/10/2024",
      contenido:
        "Hola, estoy teniendo algunos problemas para pagar la matrícula a tiempo y quería saber si alguien sabe qué opciones tengo. ¿Se puede pedir algún tipo de financiamiento o hay becas para estas situaciones? Si alguien ya pasó por algo parecido, agradecería cualquier consejo.",
      respuestas: [],
      topico: "Becas", // Añadir la propiedad `topico`
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  if (isAuthenticated === null) {
    // Mientras carga la información de autenticación
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }

  const agregarTema = (nuevoTema: Tema) => {
    setTemas((prevTemas) => [...prevTemas, nuevoTema]);
  };

  const agregarRespuesta = (
    temaId: number,
    respuesta: { autor: string; contenido: string }
  ) => {
    setTemas((prevTemas) =>
      prevTemas.map((tema) =>
        tema.id === temaId
          ? {
              ...tema,
              respuestas: [
                ...tema.respuestas,
                { id: Date.now(), ...respuesta },
              ],
            } // Generar un ID único para la respuesta
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
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
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
              <AuthenticatedLayout>
                <div className="relative">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Preguntas del Foro</h1>
                    <button
                      onClick={openModal}
                      className="bg-sky-800 text-white px-4 py-2 rounded shadow-lg"
                    >
                      Añadir Pregunta
                    </button>
                  </div>
                  <TemaLista temas={temas} />
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <AgregarPregunta
                      agregarTema={agregarTema}
                      onClose={closeModal}
                    />
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
              <AuthenticatedLayout>
                <RenderDetalleTema
                  temas={temas}
                  agregarRespuesta={agregarRespuesta}
                />
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

// Layout para páginas autenticadas
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto p-6 pt-24 relative">
      <NavigationButton /> {/* Botón fijo de navegación */}
      {children} {/* Contenido dinámico (foro, preguntas, respuestas) */}
      <Chatbot /> {/* Chatbot con historial */}
    </div>
  );
};

// Componente para mostrar el detalle de un tema
interface RenderDetalleTemaProps {
  temas: Tema[];
  agregarRespuesta: (
    temaId: number,
    respuesta: { autor: string; contenido: string }
  ) => void;
}

const RenderDetalleTema: React.FC<RenderDetalleTemaProps> = ({
  temas,
  agregarRespuesta,
}) => {
  const { temaId } = useParams<{ temaId: string }>();
  const tema = temas.find((t) => t.id === Number(temaId));
  const navigate = useNavigate();

  if (!tema) {
    return <div>No se encontró el tema.</div>;
  }

  const handleAgregarRespuesta = (respuesta: {
    autor: string;
    contenido: string;
  }) => {
    agregarRespuesta(tema.id, respuesta);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/foro")}
        className="bg-sky-700 text-white px-4 py-2 rounded mb-4 shadow-lg"
      >
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
