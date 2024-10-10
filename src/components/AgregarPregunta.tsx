import React, { useState } from 'react';
import { Tema } from '../types';
import { FaTimes } from 'react-icons/fa';

interface AgregarPreguntaProps {
  agregarTema: (nuevoTema: Tema) => void;
  onClose: () => void;
}

const AgregarPregunta: React.FC<AgregarPreguntaProps> = ({ agregarTema, onClose }) => {
  const [nombre, setNombre] = useState('Anónimo');
  const [pregunta, setPregunta] = useState('');
  const [contenido, setContenido] = useState('');
  const [topico, setTopico] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pregunta.trim() || !topico) return;

    const newTema: Tema = {
      id: Date.now(),
      titulo: pregunta,
      autor: nombre,
      fecha: new Date().toLocaleDateString(),
      contenido: contenido,
      respuestas: [],
      topico: topico,
    };

    agregarTema(newTema);
    onClose(); // Cerrar el modal o formulario
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* El modal */}
      <form onSubmit={handleSubmit} className="bg-white p-0.5 border rounded-lg shadow-lg w-[600px] relative">
        {/* Barra roja con el título y la X de cerrar */}
        <div className="bg-red-800 text-white text-lg font-bold p-4 rounded-t-lg flex justify-between items-center">
          Agregar Pregunta
          <button onClick={onClose} className="text-white">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Campos del formulario */}
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="font-bold block mb-1">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="topico" className="font-bold block mb-1">Tema:</label>
            <select
              id="topico"
              value={topico}
              onChange={(e) => setTopico(e.target.value)}
              className="border w-full p-2 rounded"
            >
              <option value="">Selecciona un tema</option>
              <option value="Matrícula Extemporánea">Matrícula Extemporánea</option>
              <option value="Becas">Becas</option>
              <option value="Aplazados">Aplazados</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="pregunta" className="font-bold block mb-1">Pregunta:</label>
            <input
              type="text"
              id="pregunta"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              className="border w-full p-2 rounded"
              placeholder="Escribe tu pregunta"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contenido" className="font-bold block mb-1">Contenido:</label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="border w-full p-2 rounded"
              rows={5}
              placeholder="Contenido adicional sobre tu pregunta"
            />
          </div>

          <button type="submit" className="bg-red-800 text-white p-2 rounded mt-2 w-auto">
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarPregunta;
