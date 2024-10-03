// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import TemaLista from './components/TemaLista';
import AgregarPregunta from './components/AgregarPregunta';
import DetalleTema from './components/DetalleTema';
import NavigationButton from './components/NavigationButton';
import { Tema } from './types';

const App: React.FC = () => {
  const [temas, setTemas] = useState<Tema[]>([
    {
      id: 1,
      titulo: '¿Cuándo será el próximo proceso de matrícula?',
      autor: 'Juan',
      fecha: '01/10/2024',
      contenido: 'Detalles sobre el proceso de matrícula, requisitos y fechas importantes.',
      respuestas: []
    },
    {
      id: 2,
      titulo: '¿Cuáles son los requisitos para aplicar a una beca internacional?',
      autor: 'Vanessa',
      fecha: '02/10/2024',
      contenido: 'Información sobre becas disponibles para estudiantes de FISI.',
      respuestas: []
    }
  ]);

  const agregarTema = (nuevoTema: Tema) => {
    setTemas(prevTemas => [...prevTemas, nuevoTema]);
  };

  return (
    <Router>
      <div className="container mx-auto p-4 relative">
        <h1 className="text-3xl font-bold mb-5">Foro FISI</h1>
        <NavigationButton /> {/* Botón para navegar entre páginas */}
        <Routes>
          <Route path="/" element={<TemaLista temas={temas} />} />
          <Route path="/agregar" element={<AgregarPregunta agregarTema={agregarTema} />} />
          <Route path="/tema/:temaId" element={<RenderDetalleTema temas={temas} />} />
        </Routes>
      </div>
    </Router>
  );
};

// Componente que maneja la lógica para obtener el tema y pasarlo a DetalleTema
const RenderDetalleTema: React.FC<{ temas: Tema[] }> = ({ temas }) => {
  const { temaId } = useParams<{ temaId: string }>();
  const tema = temas.find(t => t.id === Number(temaId));

  if (!tema) {
    return <div>No se encontró el tema.</div>;
  }

  return <DetalleTema tema={tema} respuestas={tema.respuestas} />;
};

export default App;
