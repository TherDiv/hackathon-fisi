// src/components/AgregarPregunta.tsx
import React, { useState } from 'react';
import { Tema } from '../types';

interface AgregarPreguntaProps {
  agregarTema: (nuevoTema: Tema) => void;
  onClose: () => void; // Propiedad para manejar el cierre del modal
}

const AgregarPregunta: React.FC<AgregarPreguntaProps> = ({ agregarTema, onClose }) => {
  const [nombre, setNombre] = useState('Usuario'); // Valor predeterminado 'Usuario'
  const [pregunta, setPregunta] = useState('');
  const [contenido, setContenido] = useState('');

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pregunta) {
      alert('Por favor, escribe un título para la pregunta');
      return;
    }

    const newTema: Tema = {
      id: Date.now(), // Generar un ID único basado en el timestamp actual
      titulo: pregunta,
      autor: nombre,
      fecha: new Date().toLocaleDateString(), // Fecha actual
      contenido: contenido,
      respuestas: []
    };

    agregarTema(newTema); // Llamar a la función para agregar la nueva pregunta al foro
    onClose(); // Cerrar el modal después de agregar la pregunta
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="font-bold text-xl mb-4">Añadir Pregunta</h2>
      <input
        type="text"
        placeholder="Nombre (opcional)"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border mb-4 p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Título de la pregunta"
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
        className="border mb-4 p-2 w-full rounded"
        required
      />
      <textarea
        placeholder="Contenido adicional (opcional)"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        className="border mb-4 p-2 w-full rounded"
      />
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded mr-2">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Añadir
        </button>
      </div>
    </form>
  );
};

export default AgregarPregunta;
