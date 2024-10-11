// src/types.ts

export interface Tema {
    id: number;
    titulo: string;
    autor: string;
    fecha: string;
    contenido: string;
    respuestas: Respuesta[];
    topico: string; // Nuevo campo para almacenar el tópico
  }
  
  export interface Respuesta {
    id: number; // Asegúrate de incluir el id
    autor: string;
    contenido: string;
  }
  