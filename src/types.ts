// src/types.ts
export interface Respuesta {
    id: number;
    autor: string;
    contenido: string;
}

export interface Tema {
    id: number;
    titulo: string;
    contenido: string;
    autor: string;
    fecha: string;
    respuestas: Respuesta[]; // Un array de respuestas
}
