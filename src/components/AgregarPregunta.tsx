import React, { useState } from 'react';
import { Tema } from '../types';
import { FaTimes } from 'react-icons/fa';

interface AgregarPreguntaProps {
  agregarTema: (nuevoTema: Tema) => void;
  onClose: () => void;
}

const AgregarPregunta: React.FC<AgregarPreguntaProps> = ({ agregarTema, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [contenido, setContenido] = useState('');
  const [topico, setTopico] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!pregunta.trim() || !topico) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const newTema: Tema = {
      id: Date.now(),
      titulo: pregunta,
      autor: nombre.trim() ? nombre : 'Anónimo', // Nombre por defecto si no se especifica
      fecha: new Date().toLocaleDateString(),
      contenido: contenido,
      respuestas: [],
      topico: topico,
    };

    agregarTema(newTema);
    onClose(); // Cerrar el modal después de añadir la pregunta
  };

  // Manejar el cierre del modal y advertir al usuario si se han llenado campos
  const handleClose = () => {
    if (nombre || pregunta || contenido || topico) {
      const confirmar = window.confirm('¿Estás seguro de que deseas cerrar? Los datos no guardados se perderán.');
      if (!confirmar) return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form onSubmit={handleSubmit} className="bg-white border rounded-md shadow-lg w-[600px] h-auto relative">
        <div className="bg-sky-800 text-white text-lg font-bold p-3 rounded-t-md flex justify-between items-center">
          Agregar Pregunta
          <button onClick={handleClose} type="button" className="text-white">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-4">
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="mb-4">
            <label htmlFor="nombre" className="font-bold block mb-1">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border w-full p-2 rounded"
              placeholder="Tu nombre (opcional)"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="topico" className="font-bold block mb-1">Tópico:</label>
            <select
              id="topico"
              value={topico}
              onChange={(e) => setTopico(e.target.value)}
              className="border w-full p-2 rounded"
            >
              <option value="">Selecciona un tópico</option>
              <option value="Investigación">Investigación</option>
              <option value="Ciencias de la Computación">Ciencias de la Computación</option>
              <option value="Prácticas Preprofesionales">Prácticas Preprofesionales</option>
              <option value="Matrícula">Matrícula</option>
              <option value="Aplazados">Aplazados</option>
              <option value="Becas">Becas</option>
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
            <label htmlFor="contenido" className="font-bold block mb-1">Contenido adicional:</label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="border mb-2 p-2 w-full rounded overflow-y-auto"
              placeholder="Contenido adicional sobre tu pregunta (opcional)"
              rows={4}
              style={{ resize: 'none' }}
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-sky-800 text-white p-2 rounded">
              Añadir
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgregarPregunta;
