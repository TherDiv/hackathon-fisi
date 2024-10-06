// src/components/TemaLista.tsx
import React, { useState } from 'react';
import { Tema } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  temas: Tema[];
}

const TemaLista: React.FC<Props> = ({ temas }) => {
  const [topicoFiltro, setTopicoFiltro] = useState(''); // Estado para el filtro por tópico

  // Filtrar los temas según el tópico seleccionado
  const temasFiltrados = topicoFiltro
    ? temas.filter((tema) => tema.topico === topicoFiltro)
    : temas;

  return (
    <div className="mt-5">
      <select
        value={topicoFiltro}
        onChange={(e) => setTopicoFiltro(e.target.value)}
        className="border mb-4 p-2 w-full rounded"
      >
        <option value="">Filtrar por tópico</option>
        <option value="Matrícula">Matrícula</option>
        <option value="Becas">Becas</option>
        <option value="Aplazados">Aplazados</option>
      </select>
      {temasFiltrados.length === 0 ? (
        <p className="text-gray-600">No hay temas disponibles.</p>
      ) : (
        temasFiltrados.map((tema) => (
          <Link
            to={`/tema/${tema.id}`}
            key={tema.id}
            className="block border p-4 mb-2 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <h3 className="font-bold text-lg">{tema.titulo}</h3>
            <p className="text-sm text-gray-600">
              Autor: {tema.autor} | Fecha: {tema.fecha} | Respuestas: {tema.respuestas.length} | Tópico: {tema.topico}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default TemaLista;
