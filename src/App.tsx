// src/App.tsx
import React, { useState, useEffect } from 'react'; // Añadir `useEffect` aquí
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Importar `useParams` por separado
import TemaLista from './components/TemaLista';
import AgregarPregunta from './components/AgregarPregunta';
import DetalleTema from './components/DetalleTema';
import NavigationButton from './components/NavigationButton'; // Importar el componente del título fijo
import Modal from './components/Modal'; // Importar el componente Modal
import Login from './components/Login';
import Chatbot from './components/Chatbot';  // Cambiando la "C" a minúscula.
import { Tema } from './types';

const App: React.FC = () => {
  const [temas, setTemas] = useState<Tema[]>([
    {
      id: 1,
      titulo: '¿Cuándo será el próximo proceso de matrícula?',
      autor: 'Juan',
      fecha: '01/10/2024',
      contenido: 'Hola, alguien sabe cuándo empiezan las fechas de matrícula para el próximo ciclo? Escuché que cambiaron los plazos, pero no estoy seguro. Agradecería cualquier información, especialmente sobre las fechas y qué documentos necesito tener listos.',
      respuestas: []
    },
    {
      id: 2,
      titulo: '¿Cuáles son los requisitos para aplicar a una beca internacional?',
      autor: 'Vanessa',
      fecha: '02/10/2024',
      contenido: 'Hola a todos! Estoy interesada en aplicar a una beca internacional, pero no tengo muy claro por dónde empezar. ¿Alguien ya ha pasado por este proceso y me podría decir qué documentos piden y si hay algún requisito especial? Cualquier ayuda sería genial :)',
      respuestas: []
    },
    {
      id: 3,
      titulo: '¿Qué hacer si tengo que dar exámenes de aplazados?',
      autor: 'Carlos',
      fecha: '03/10/2024',
      contenido: 'Chicos, tengo que dar los exámenes de aplazados y la verdad estoy un poco perdido. ¿Alguien sabe cómo va eso? ¿Hay que inscribirse en algún sitio o simplemente aparecen las fechas en el sistema? Si alguno ha pasado por esto antes, agradecería sus consejos.',
      respuestas: []
    },
    {
      id: 4,
      titulo: '¿Cómo puedo pedir una prórroga para la matrícula?',
      autor: 'Ana',
      fecha: '04/10/2024',
      contenido: 'El otro día me comentaron que se puede pedir una prórroga para la matrícula si uno tiene problemas para pagar a tiempo. ¿Alguien sabe cómo hacer esto? ¿Es complicado o te ponen muchas trabas? Cualquier experiencia que puedan compartir me sería muy útil!',
      respuestas: []
    },
    {
      id: 5,
      titulo: 'Documentos para la matrícula, ¿qué necesito exactamente?',
      autor: 'María',
      fecha: '05/10/2024',
      contenido: 'Hola, estoy tratando de organizarme para la matrícula, pero no estoy segura de qué documentos necesito tener listos. ¿Alguien tiene la lista completa o sabe si este año piden algo diferente? Prefiero estar preparada antes de que empiecen las fechas.',
      respuestas: []
    },
    {
      id: 6,
      titulo: '¿Cómo se puede recuperar un curso aplazado?',
      autor: 'Luis',
      fecha: '06/10/2024',
      contenido: 'Alguien me puede ayudar con esto: ¿cómo es el proceso para recuperar un curso aplazado? Me dijeron que se puede volver a llevar el próximo ciclo, pero no sé si hay algún costo adicional o si tengo que hacer algún trámite especial antes. Cualquier dato me ayuda.',
      respuestas: []
    },
    {
      id: 7,
      titulo: '¿Puedo cambiar la carga de cursos después de haberme matriculado?',
      autor: 'Sofía',
      fecha: '07/10/2024',
      contenido: 'Hola chicos, ¿saben si es posible cambiar los cursos después de hacer la matrícula? Me preocupa que me haya inscrito en demasiados créditos y no sé si aún puedo ajustar la carga antes de que empiece el ciclo. ¿Alguien ha hecho esto antes?',
      respuestas: []
    },
    {
      id: 8,
      titulo: 'Problemas para pagar la matrícula, ¿qué opciones hay?',
      autor: 'Diego',
      fecha: '08/10/2024',
      contenido: 'Hola, estoy teniendo algunos problemas para pagar la matrícula a tiempo y quería saber si alguien sabe qué opciones tengo. ¿Se puede pedir algún tipo de financiamiento o hay becas para estas situaciones? Si alguien ya pasó por algo parecido, agradecería cualquier consejo.',
      respuestas: []
    }
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal

  useEffect(() => {
    // Obtener el estado de autenticación desde `localStorage`
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const agregarTema = (nuevoTema: Tema) => {
    setTemas(prevTemas => [...prevTemas, nuevoTema]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="container mx-auto p-4 pt-24 relative">
        <NavigationButton /> {/* Título fijo del foro */}
        <Routes>
          {/* Ruta para login */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/foro" replace /> : <Login />} />
          
          {/* Ruta para el foro principal */}
          <Route
            path="/foro"
            element={
              isAuthenticated ? (
                <div className="relative">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Preguntas del Foro</h1>
                    <button
                      onClick={openModal}
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
                    >
                      Agregar Pregunta
                    </button>
                  </div>
                  <TemaLista temas={temas} />
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <AgregarPregunta agregarTema={agregarTema} onClose={closeModal} />
                  </Modal>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          
          {/* Ruta para ver detalles de un tema */}
          <Route
            path="/tema/:temaId"
            element={isAuthenticated ? <RenderDetalleTema temas={temas} /> : <Navigate to="/" replace />}
          />
        </Routes>
        <Chatbot /> {/* Añadir el chatbot aquí para que siempre esté presente */}
      </div>
    </Router>
  );
};

// Componente que maneja la lógica para obtener el tema y pasarlo a DetalleTema
const RenderDetalleTema: React.FC<{ temas: Tema[] }> = ({ temas }) => {
  const { temaId } = useParams<{ temaId: string }>();
  const tema = temas.find((t) => t.id === Number(temaId));

  if (!tema) {
    return <div>No se encontró el tema.</div>;
  }

  return <DetalleTema tema={tema} respuestas={tema.respuestas} />;
};

export default App;
