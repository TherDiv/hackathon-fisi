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
    id: number;
    autor: string;
    contenido: string;
  }
  