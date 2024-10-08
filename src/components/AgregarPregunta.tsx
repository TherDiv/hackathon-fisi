// src/components/AgregarPregunta.tsx
import React, { useState } from 'react';
import { Tema } from '../types';

interface AgregarPreguntaProps {
  agregarTema: (nuevoTema: Tema) => void;
  onClose: () => void;
}

const AgregarPregunta: React.FC<AgregarPreguntaProps> = ({ agregarTema, onClose }) => {
  const [nombre, setNombre] = useState('Anónimo');
  const [pregunta, setPregunta] = useState('');
  const [contenido, setContenido] = useState('');
  const [topico, setTopico] = useState(''); // Nuevo estado para el tópico

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pregunta.trim() || !topico) return; // Validar que haya una pregunta y un tópico

    const newTema: Tema = {
      id: Date.now(),
      titulo: pregunta,
      autor: nombre,
      fecha: new Date().toLocaleDateString(),
      contenido: contenido,
      respuestas: [],
      topico: topico // Añadir el tópico al nuevo tema
    };

    agregarTema(newTema);
    onClose(); // Cerrar el modal
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 p-4 border rounded-lg shadow-md">
      <h2 className="font-bold text-xl mb-2">Añadir Pregunta</h2>
      <input
        type="text"
        placeholder="Nombre (opcional)"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      />
      <textarea
        placeholder="Escribe tu pregunta"
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      />
      <textarea
        placeholder="Contenido adicional"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      />
      <select
        value={topico}
        onChange={(e) => setTopico(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      >
        <option value="">Selecciona un tópico</option>
        <option value="Matrícula">Matrícula</option>
        <option value="Becas">Becas</option>
        <option value="Aplazados">Aplazados</option>
      </select>
      <button type="submit" className="bg-red-800 text-white p-2 rounded mt-2">
        Añadir
      </button>
    </form>
  );
};

export default AgregarPregunta;
