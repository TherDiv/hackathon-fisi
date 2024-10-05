// src/components/TemaLista.tsx
import React, { useState } from 'react';
import { Tema } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  temas: Tema[];
}

const TemaLista: React.FC<Props> = ({ temas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopic, setFilteredTopic] = useState('');

  const filteredTemas = temas.filter(tema =>
    tema.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filteredTopic === '' || tema.titulo.toLowerCase().includes(filteredTopic.toLowerCase()))
  );

  return (
    <div className="mt-5">
      <input
        type="text"
        placeholder="Buscar por palabra clave"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border mb-4 p-2 w-full rounded"
      />
      <select
        value={filteredTopic}
        onChange={(e) => setFilteredTopic(e.target.value)}
        className="border mb-4 p-2 w-full rounded"
      >
        <option value="">Filtrar por tópico</option>
        <option value="matrícula">Matrícula</option>
        <option value="beca">Becas</option>
        <option value="apla">Aplazados</option>
        {/* Otros tópicos según sea necesario */}
      </select>

      {filteredTemas.length === 0 ? (
        <p className="text-gray-600">No hay temas disponibles.</p>
      ) : (
        filteredTemas.map((tema) => (
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
