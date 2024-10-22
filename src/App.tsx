import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useParams } from 'react-router-dom';
import AgregarPregunta from './components/AgregarPregunta';
import AgregarRespuesta from './components/AgregarRespuesta';
import NavigationButton from './components/NavigationButton';
import Modal from './components/Modal';
import Login from './components/Login';
import Register from './components/Register';
import Chatbot from './components/Chatbot';
import PaginaFisi from './components/PaginaFisi';
import { Tema } from './types';

const App: React.FC = () => {
  const [temas, setTemas] = useState<Tema[]>([
    {
      id: 1,
      titulo: '¿Cuándo se realizarán las inscripciones para los nuevos proyectos de investigación?',
      autor: 'Juan Pérez',
      fecha: '01/10/2024',
      contenido: 'Hola, alguien sabe cuándo comienzan las inscripciones para los nuevos proyectos de investigación en la FISI? Estoy interesado en unirme a un proyecto en el área de Ingeniería de Software. Agradezco cualquier información.',
      respuestas: [
        {
          id: 1,
          autor: 'María González',
          contenido: 'Hola Juan, las inscripciones empiezan el 15 de octubre. Te sugiero que te acerques al coordinador de investigación de la facultad para más detalles.'
        },
        {
          id: 2,
          autor: 'Carlos Rojas',
          contenido: 'Sí, y recuerda que algunos proyectos requieren tener un mínimo de créditos avanzados. Verifica eso antes de inscribirte.'
        },
      ],
      topico: 'Investigación'
    },
    {
      id: 2,
      titulo: '¿Recomendaciones para cursos de Ciencias de la Computación?',
      autor: 'Vanessa Salazar',
      fecha: '02/10/2024',
      contenido: 'Hola a todos! Estoy empezando el segundo ciclo de Ciencias de la Computación y me gustaría recibir recomendaciones sobre qué cursos llevar primero y cuáles requieren más tiempo de estudio.',
      respuestas: [
        {
          id: 1,
          autor: 'Pedro Huamán',
          contenido: 'Te recomendaría empezar por Algoritmos y Estructuras de Datos. Es fundamental para todo lo que verás más adelante.'
        },
        {
          id: 2,
          autor: 'Laura Quintana',
          contenido: 'Concuerdo con Pedro. Además, si puedes llevar Matemáticas Discretas temprano, te ayudará con los temas de lógica y teoría de la computación.'
        },
      ],
      topico: 'Ciencias de la Computación'
    },
    {
      id: 3,
      titulo: '¿Cuándo se abren las inscripciones para las prácticas preprofesionales?',
      autor: 'Luis Ramírez',
      fecha: '04/10/2024',
      contenido: 'Hola, quería saber cuándo se abren las inscripciones para las prácticas preprofesionales en la facultad de Ingeniería de Sistemas. Quiero realizar mis prácticas este semestre.',
      respuestas: [
        {
          id: 1,
          autor: 'Sofía Fernández',
          contenido: 'Hola Luis, las inscripciones para prácticas comienzan el próximo lunes. No te olvides de tener tu historial académico y el CV actualizado.'
        },
      ],
      topico: 'Prácticas Preprofesionales'
    },
    {
      id: 4,
      titulo: '¿Cómo puedo pedir una prórroga para la matrícula?',
      autor: 'Ana Martínez',
      fecha: '05/10/2024',
      contenido: 'El otro día me comentaron que se puede pedir una prórroga para la matrícula si uno tiene problemas para pagar a tiempo. ¿Alguien sabe cómo hacer esto? ¿Es complicado o te ponen muchas trabas? Cualquier experiencia que puedan compartir me sería muy útil!',
      respuestas: [
        {
          id: 1,
          autor: 'Luis García',
          contenido: 'Ana, no es complicado, pero necesitas enviar una solicitud formal al departamento de finanzas antes del 10 de octubre.'
        },
        {
          id: 2,
          autor: 'Sofía Valdez',
          contenido: 'Yo lo hice el ciclo pasado. Solo asegúrate de tener una buena razón y tal vez algún documento que justifique la solicitud.'
        },
      ],
      topico: 'Matrícula'
    },
    {
      id: 5,
      titulo: 'Documentos para la matrícula, ¿qué necesito exactamente?',
      autor: 'María López',
      fecha: '05/10/2024',
      contenido: 'Hola, estoy tratando de organizarme para la matrícula, pero no estoy segura de qué documentos necesito tener listos. ¿Alguien tiene la lista completa o sabe si este año piden algo diferente? Prefiero estar preparada antes de que empiecen las fechas.',
      respuestas: [
        {
          id: 1,
          autor: 'Diego Campos',
          contenido: 'Hola María, necesitas tu certificado de notas, tu constancia de no adeudo y el recibo de pago de la matrícula.'
        },
        {
          id: 2,
          autor: 'Valeria Medina',
          contenido: 'Este año también están pidiendo una foto reciente tipo carnet, no te olvides de eso.'
        },
      ],
      topico: 'Matrícula'
    },
    {
      id: 6,
      titulo: '¿Cómo se puede recuperar un curso aplazado?',
      autor: 'Luis Ramírez',
      fecha: '06/10/2024',
      contenido: 'Alguien me puede ayudar con esto: ¿cómo es el proceso para recuperar un curso aplazado? Me dijeron que se puede volver a llevar el próximo ciclo, pero no sé si hay algún costo adicional o si tengo que hacer algún trámite especial antes. Cualquier dato me ayuda.',
      respuestas: [
        {
          id: 1,
          autor: 'Carlos Gómez',
          contenido: 'Luis, sí puedes volver a llevarlo el próximo ciclo, pero tienes que pagar una tarifa adicional y llenar un formulario en el sistema.'
        },
        {
          id: 2,
          autor: 'Lucía Fernández',
          contenido: 'Además, asegúrate de hablar con el coordinador de tu carrera para que te orienten sobre la inscripción.'
        },
      ],
      topico: 'Aplazados'
    },
    {
      id: 7,
      titulo: '¿Puedo cambiar la carga de cursos después de haberme matriculado?',
      autor: 'Sofía Díaz',
      fecha: '07/10/2024',
      contenido: 'Hola chicos, ¿saben si es posible cambiar los cursos después de hacer la matrícula? Me preocupa que me haya inscrito en demasiados créditos y no sé si aún puedo ajustar la carga antes de que empiece el ciclo. ¿Alguien ha hecho esto antes?',
      respuestas: [
        {
          id: 1,
          autor: 'Gabriel Martínez',
          contenido: 'Sofía, sí se puede cambiar la carga de cursos, pero solo durante la primera semana del ciclo. Debes hacerlo en el sistema antes de que cierren las modificaciones.'
        },
        {
          id: 2,
          autor: 'Mariana Paredes',
          contenido: 'Habla con tu coordinador, ellos pueden ayudarte si ya se pasó el plazo, pero dependerá de la situación.'
        },
      ],
      topico: 'Matrícula'
    },
    {
      id: 8,
      titulo: 'Problemas para pagar la matrícula, ¿qué opciones hay?',
      autor: 'Diego Vargas',
      fecha: '08/10/2024',
      contenido: 'Hola, estoy teniendo algunos problemas para pagar la matrícula a tiempo y quería saber si alguien sabe qué opciones tengo. ¿Se puede pedir algún tipo de financiamiento o hay becas para estas situaciones? Si alguien ya pasó por algo parecido, agradecería cualquier consejo.',
      respuestas: [
        {
          id: 1,
          autor: 'Fernanda Torres',
          contenido: 'Diego, puedes pedir financiamiento directamente con la universidad. Hay un programa de cuotas que permite pagar en partes.'
        },
        {
          id: 2,
          autor: 'José Morales',
          contenido: 'Revisa también si hay alguna beca de emergencia, algunas veces dan ese apoyo a estudiantes que tienen dificultades económicas.'
        },
      ],
      topico: 'Becas'
    }
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filtroTopico, setFiltroTopico] = useState<string>(''); // Estado para gestionar el filtro de tópicos

  // Para comprobar el estado de autenticación desde el almacenamiento local.
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  // Añadir un nuevo tema.
  const agregarTema = (nuevoTema: Tema) => {
    setTemas(prevTemas => [...prevTemas, nuevoTema]);
  };

  // Añadir una respuesta a una pregunta existente.
  const agregarRespuesta = (temaId: number, respuesta: { autor: string; contenido: string }) => {
    setTemas(prevTemas =>
      prevTemas.map(tema =>
        tema.id === temaId
          ? { ...tema, respuestas: [...tema.respuestas, { id: Date.now(), ...respuesta }] }
          : tema
      )
    );
  };

  // Funciones para abrir y cerrar el modal.
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Manejar cambios en el filtro de tópicos.
  const handleFiltroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroTopico(event.target.value);
  };

  // Filtrar los temas según el tópico seleccionado.
  const temasFiltrados = filtroTopico ? temas.filter(tema => tema.topico === filtroTopico) : temas;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PaginaFisi />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/foro" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/foro" replace /> : <Register />
            }
          />
          <Route
            path="/foro"
            element={
              isAuthenticated ? (
                <AuthenticatedLayout setIsAuthenticated={setIsAuthenticated}>
                  <Foro
                    temas={temasFiltrados}
                    openModal={openModal}
                    handleFiltroChange={handleFiltroChange}
                    filtroTopico={filtroTopico}
                  />
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <AgregarPregunta agregarTema={agregarTema} onClose={closeModal} />
                  </Modal>
                </AuthenticatedLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
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
      </div>
    </Router>
  );
};

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
  const navigate = useNavigate();
  const tema = temas.find((t) => t.id === Number(temaId));

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
        <p className="mt-2">{tema.contenido}</p> {/* Muestra el contenido del tema */}

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

interface ForoProps {
  temas: Tema[];
  openModal: () => void;
  handleFiltroChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filtroTopico: string;
}

const Foro: React.FC<ForoProps> = ({ temas, openModal, handleFiltroChange, filtroTopico }) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Preguntas del Foro</h1>
        <button onClick={openModal} className="bg-sky-800 text-white px-4 py-2 rounded shadow-lg">
          Añadir Pregunta
        </button>
      </div>

      {/* Filtro de Tópico */}
      <div className="mb-4">
        <label htmlFor="filtroTopico" className="font-bold mr-2">Filtrar por Tópico:</label>
        <select
          id="filtroTopico"
          value={filtroTopico}
          onChange={handleFiltroChange}
          className="border p-2 rounded"
        >
          <option value="">Todos</option>
          <option value="Investigación">Investigación</option>
          <option value="Ciencias de la Computación">Ciencias de la Computación</option>
          <option value="Prácticas Preprofesionales">Prácticas Preprofesionales</option>
          <option value="Matrícula">Matrícula</option>
          <option value="Aplazados">Aplazados</option>
          <option value="Becas">Becas</option>
        </select>
      </div>

      {/* Lista de Temas */}
      <div>
        {temas.map((tema) => (
          <div
            key={tema.id}
            onClick={() => navigate(`/tema/${tema.id}`)}
            className="cursor-pointer border p-4 my-2 rounded-md shadow-md hover:bg-gray-100 transition"
          >
            <h3 className="text-lg font-bold">{tema.titulo}</h3>
            <p>Autor: {tema.autor} | Fecha: {tema.fecha} | Tópico: {tema.topico}</p>
            <p><strong>Respuestas:</strong> {tema.respuestas.length}</p>
            <p className="mt-2 text-gray-700">{tema.contenido}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
