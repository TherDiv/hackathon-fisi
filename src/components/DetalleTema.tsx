// src/components/DetalleTema.tsx
import React from 'react';
import { Tema, Respuesta } from '../types';

interface DetalleTemaProps {
  tema: Tema;
  respuestas: Respuesta[];
}

const DetalleTema: React.FC<DetalleTemaProps> = ({ tema, respuestas }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md mb-5">
      <h2 className="font-bold text-xl">{tema.titulo}</h2>
      <p className="text-gray-600">Autor: {tema.autor} | Fecha: {tema.fecha}</p>
      <p className="mt-2">{tema.contenido}</p>

      <h3 className="font-bold text-lg mt-4">Respuestas:</h3>
      <div className="mt-2">
        {respuestas.length === 0 ? (
          <p className="text-gray-500">No hay respuestas aún.</p>
        ) : (
          respuestas.map((respuesta) => (
            <div key={respuesta.id} className="border p-2 mb-2 rounded">
              <p className="font-bold">{respuesta.autor}</p>
              <p>{respuesta.contenido}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DetalleTema;
