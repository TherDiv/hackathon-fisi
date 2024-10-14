// src/components/ChatbotInvitado.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaComments, FaWindowMinimize } from 'react-icons/fa';

interface Message {
  sender: 'bot' | 'user'; // 'bot' o 'user' para el tipo de mensaje
  text: string;
}

interface NewSessionResponse {
  session_id: string;
  message: string;
}

interface AskResponse {
  response: string;
}

const ChatbotInvitado: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Mensajes del chat
  const [input, setInput] = useState(''); // Entrada del usuario
  const [sessionId, setSessionId] = useState<string | null>(null); // Session ID para el usuario
  const [isMinimized, setIsMinimized] = useState(true); // Estado de minimización del chat
  const [loading, setLoading] = useState(false); // Estado de carga mientras se espera la respuesta del bot
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  // 1. Función para iniciar una nueva sesión al abrir el chatbot
  const startNewSession = async () => {
    try {
      const response = await axios.post<NewSessionResponse>(
        'https://vercel-backend-flame.vercel.app/api/chatbot/new-session',
        { usuario_id: 'guest' }, // Usuario invitado (hardcoded)
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Guardar la session_id y el mensaje de bienvenida
      setSessionId(response.data.session_id);
      setMessages([{ sender: 'bot', text: response.data.message }]); // Mensaje de bienvenida
    } catch (error) {
      console.error('Error al iniciar la sesión:', error);
      setError('No se pudo iniciar la sesión con el chatbot.');
    }
  };

  useEffect(() => {
    // Crear una nueva sesión cuando se monta el componente
    startNewSession();
  }, []);

  // 2. Función para enviar un mensaje al bot
  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return; // No enviar si el input está vacío o no hay sessionId

    const userMessage: Message = { sender: 'user', text: input }; // Mensaje del usuario
    setMessages((prev) => [...prev, userMessage]); // Añadir el mensaje del usuario al historial
    setInput(''); // Limpiar la entrada
    setLoading(true); // Iniciar el estado de carga
    setError(null); // Limpiar cualquier error anterior

    try {
      // Enviar la pregunta al backend y recibir la respuesta del bot
      const response = await axios.post<AskResponse>(
        'https://vercel-backend-flame.vercel.app/api/chatbot/ask',
        {
          usuario_id: 'guest', // Usuario invitado (hardcoded)
          session_id: sessionId, // Usar la sessionId del estado
          message: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Procesar la respuesta del bot
      const botMessage: Message = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botMessage]); // Añadir el mensaje del bot al historial
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      const errorMessage: Message = {
        sender: 'bot',
        text: 'Error en la respuesta del chatbot. Por favor, intenta de nuevo.',
      };
      setMessages((prev) => [...prev, errorMessage]); // Mostrar el mensaje de error en el chat
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Manejar la tecla Enter para enviar el mensaje
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(); // Enviar mensaje al presionar Enter
    }
  };

  // Alternar la minimización del chatbot
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {isMinimized ? (
        // Botón flotante para abrir el chatbot
        <button
          onClick={toggleMinimize}
          className="fixed bottom-4 right-4 bg-red-800 text-white p-5 rounded-full shadow-lg z-50"
        >
          <FaComments size={32} />
        </button>
      ) : (
        // Ventana del chatbot abierta
        <div className="fixed bottom-0 right-0 m-4 w-[400px] h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex flex-col">
          {/* Header del chatbot */}
          <div className="p-4 bg-red-700 text-white font-bold rounded-t-lg flex justify-between items-center">
            <span>Chat Invitado</span>
            <button onClick={toggleMinimize} className="text-white">
              <FaWindowMinimize size={16} />
            </button>
          </div>

          {/* Mostrar mensajes */}
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  message.sender === 'bot'
                    ? 'bg-red-100 text-left'
                    : 'bg-gray-300 text-right'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input para enviar mensajes */}
          <div className="p-4 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Enviar mensaje al presionar Enter
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
              placeholder="Escribe tu pregunta..."
              disabled={loading || !sessionId} // Deshabilitar el input si está cargando o no hay session_id
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-800 text-white p-2 rounded"
              disabled={loading || !sessionId} // Deshabilitar el botón si está cargando o no hay session_id
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotInvitado;
