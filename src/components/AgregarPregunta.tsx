// src/components/AgregarPregunta.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tema } from '../types';

interface AgregarPreguntaProps {
  agregarTema: (nuevoTema: Tema) => void;
}

const AgregarPregunta: React.FC<AgregarPreguntaProps> = ({ agregarTema }) => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('Anónimo');
  const [pregunta, setPregunta] = useState('');
  const [contenido, setContenido] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTema: Tema = { 
      id: Date.now(),
      titulo: pregunta,
      autor: nombre,
      fecha: new Date().toLocaleDateString(),
      contenido: contenido,
      respuestas: []
    };

    agregarTema(newTema);
    navigate('/'); // Redirigir al listado de temas
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Añadir</button>
    </form>
  );
};

export default AgregarPregunta;
