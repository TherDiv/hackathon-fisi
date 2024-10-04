// src/components/TemaLista.tsx
import React from 'react';
import { Tema } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  temas: Tema[];
}

const TemaLista: React.FC<Props> = ({ temas }) => {
  return (
    <div className="mt-5">
      {temas.length === 0 ? (
        <p className="text-gray-600">No hay temas disponibles.</p>
      ) : (
        temas.map((tema) => (
          <Link to={`/tema/${tema.id}`} key={tema.id} className="block border p-4 mb-2 rounded-lg shadow-md hover:bg-gray-100 transition">
            <h3 className="font-bold text-lg">{tema.titulo}</h3>
            <p className="text-sm text-gray-600">
              Autor: {tema.autor} | Fecha: {tema.fecha} | Respuestas: {tema.respuestas.length}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default TemaLista;
