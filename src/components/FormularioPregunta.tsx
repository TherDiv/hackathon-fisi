// src/components/FormularioPregunta.tsx
import React, { useState } from 'react';

const FormularioPregunta: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [tema, setTema] = useState('');
  const [pregunta, setPregunta] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar la pregunta (aquí puedes hacer una llamada a la API)
    console.log({ nombre, tema, pregunta });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 p-4 border rounded-lg shadow-md">
      <h2 className="font-bold text-xl mb-2">Añadir Pregunta</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      />
      <select
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      >
        <option value="">Selecciona un tema</option>
        <option value="Matricula">Matricula</option>
        <option value="Becas">Becas</option>
        {/* Otros temas */}
      </select>
      <textarea
        placeholder="Escribe tu pregunta"
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Añadir Pregunta</button>
    </form>
  );
};

export default FormularioPregunta;
