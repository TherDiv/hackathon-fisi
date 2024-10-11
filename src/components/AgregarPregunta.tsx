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
      <form onSubmit={handleSubmit} className="bg-white border rounded-md shadow-lg w-[600px] h-[540px] relative">
        {/* Barra roja con el título y la X de cerrar */}
        <div className="bg-sky-800 text-white text-lg font-bold p-3 rounded-t-md flex justify-between items-center">
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
              placeholder="Contenido adicional sobre tu pregunta"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="border mb-2 p-2 w-full rounded overflow-y-auto"
              rows={4}
              style={{ resize: 'none', height: '100px' }}  // Desactivar resize y establecer una altura fija
            ></textarea>
            <div className="absolute bottom-6 right-4">
              <button type="submit" className="bg-sky-800 text-white p-2 rounded w-auto ">
                Añadir
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgregarPregunta;
