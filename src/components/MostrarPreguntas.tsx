import React, { useEffect, useState } from 'react';
import { fetchAllQuestions } from '../services/apiService'; // Asegúrate de que esta función esté correctamente exportada

interface Pregunta {
  id: number;
  pregunta: string;
  autor: string;
  fecha: string;
}

const MostrarPreguntas: React.FC = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]); // Estado para las preguntas

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const response = await fetchAllQuestions(); // Llama a la función correcta
        const data = response.data as Pregunta[]; // Haz un type assertion para indicar que `data` es de tipo `Pregunta[]`
        setPreguntas(data); // Actualiza el estado con las preguntas obtenidas
      } catch (error) {
        console.error('Error al obtener preguntas:', error);
      }
    };

    obtenerPreguntas(); // Llamar a la función para obtener preguntas al montar el componente
  }, []);

  return (
    <div>
      <h2>Lista de Preguntas</h2>
      {preguntas.length === 0 ? (
        <p>No hay preguntas disponibles.</p>
      ) : (
        preguntas.map((pregunta) => (
          <div key={pregunta.id} className="border p-4 my-2">
            <h3>{pregunta.pregunta}</h3>
            <p>Autor: {pregunta.autor}</p>
            <p>Fecha: {pregunta.fecha}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MostrarPreguntas;
