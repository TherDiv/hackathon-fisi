// src/components/AgregarRespuesta.tsx
import React, { useState } from 'react';

interface AgregarRespuestaProps {
  onAgregarRespuesta: (respuesta: { autor: string; contenido: string }) => void;
}

const AgregarRespuesta: React.FC<AgregarRespuestaProps> = ({ onAgregarRespuesta }) => {
  const [autor, setAutor] = useState('Usuario');
  const [contenido, setContenido] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contenido.trim() === '') return;

    onAgregarRespuesta({ autor, contenido });
    setContenido(''); // Limpiar el campo de contenido
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-2">Añadir Respuesta</h3>
      <input
        type="text"
        placeholder="Nombre (opcional)"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      />
      <textarea
        placeholder="Escribe tu respuesta"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        className="border mb-2 p-2 w-full rounded"
      />
      <button type="submit" className="bg-red-800 text-white p-2 rounded mt-2">Añadir Respuesta</button>
    </form>
  );
};

export default AgregarRespuesta;
