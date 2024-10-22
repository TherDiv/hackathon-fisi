// src/services/apiService.ts
import axios from 'axios';

// Configuración base de la API
const api = axios.create({
  baseURL: 'https://vercel-backend-flame.vercel.app/api/mysqlManager', // URL base de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Crear usuario (Registro)
export const registerUser = (codigo: string, correo: string, dni: string, contrasena: string) => {
  return api.post('/create-user', { codigo, correo, dni, contrasena });
};

// 2. Iniciar sesión (Login)
export const loginUser = (correo: string, contrasena: string) => {
  return api.post('/login', { correo, contrasena });
};

// 3. Crear tema (Administrador)
export const createTopic = (tema: string) => {
  return api.post('/admin/create-topic', { tema });
};

// 4. Agregar pregunta al foro
export const addQuestion = async (
  usuario: string,
  nombre: string,
  tema_id: number,
  pregunta: string,
  contenido: string
) => {
  try {
    const response = await axios.post('https://vercel-backend-flame.vercel.app/api/mysqlManager/add-question', {
      usuario, // ID del usuario (debe ser un string)
      nombre,  // Nombre del autor de la pregunta
      tema_id, // ID del tema al que pertenece la pregunta
      pregunta, // Título de la pregunta
      contenido // Contenido adicional de la pregunta
    });

    return response;
  } catch (error: any) {
    console.error('Error al agregar la pregunta:', error);
    // Lanzar error para que el componente pueda manejarlo
    throw new Error(error.response?.data?.message || 'Error en el servidor');
  }
};

// 5. Agregar respuesta a una pregunta
export const addAnswer = (usuario_id: number, nombre: string, pregunta_id: number, contenido: string) => {
  return api.post('/add-answer', { usuario_id, nombre, pregunta_id, contenido });
};

// 6. Mostrar todas las preguntas con respuestas
export const showQuestionsAnswers = () => {
  return api.get('/show-questions-answers');
};

// 7. Mostrar preguntas filtradas por ID
export const showQuestionsAnswersByID = (pregunta_id: number) => {
  return api.post('/show-questions-answers-ID', { pregunta_id });
};

// 8. Mostrar solo preguntas
export const showQuestions = () => {
  return api.get('/show-questions');
};

// 9. Mostrar preguntas por tema
export const showQuestionsByTopic = (tema_id: number) => {
  return api.post('/show-questions-topic', { tema_id });
};

// 10. Mostrar preguntas con respuestas por tema
export const showQuestionsAnswersByTopic = (tema_id: number) => {
  return api.post('/show-questions-answers-topic', { tema_id });
};

// 11. Eliminar usuario
export const deleteUser = (usuario_id: number) => {
  return api.post('/delete-user', { usuario_id });
};

export const fetchAllQuestions = async () => {
  try {
    const response = await axios.get('/api/mysqlManager/show-questions');
    return response;
  } catch (error) {
    throw new Error('Error al obtener preguntas');
  }
};


