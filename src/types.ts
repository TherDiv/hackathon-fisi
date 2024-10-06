// src/types.ts
// src/types.ts

export interface Tema {
    id: number;
    titulo: string;
    autor: string;
    fecha: string;
    contenido: string;
    respuestas: Respuesta[];
  }
  
  export interface Respuesta {
    autor: string;
    contenido: string;
  }
  