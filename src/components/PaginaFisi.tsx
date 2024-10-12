// src/components/ChatbotInvitado.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaComments, FaWindowMinimize } from 'react-icons/fa';

interface Message {
  sender: 'bot' | 'user'; // 'bot' o 'user' para el tipo de mensaje
  text: string;
}

interface NewSessionResponse {
  session_id: string; // Almacena el session_id devuelto por el backend
  message: string; // Mensaje de bienvenida desde el backend
}

interface AskResponse {
  response: string;
}

const ChatbotInvitado: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null); // Almacena la session_id
  const [isMinimized, setIsMinimized] = useState(true);
  const [loading, setLoading] = useState(false);

  // Función para crear una nueva sesión en el backend
  const startNewSession = async () => {
    try {
      const response = await axios.post<NewSessionResponse>(
        'https://vercel-backend-flame.vercel.app/api/chatbot/new-session',
        {}
      );
      setSessionId(response.data.session_id); // Guarda el session_id
      setMessages([{ sender: 'bot', text: response.data.message }]); // Mensaje de bienvenida
    } catch (error) {
      console.error('Error al iniciar la sesión:', error);
      setMessages([{ sender: 'bot', text: 'Error al iniciar la sesión.' }]);
    }
  };

  useEffect(() => {
    // Crear una nueva sesión cuando se monta el componente
    startNewSession();
  }, []);

  // Función para enviar un mensaje al bot
  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return; // Asegúrate de que sessionId no sea nulo

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setLoading(true);

    try {
      const response = await axios.post<AskResponse>(
        'https://vercel-backend-flame.vercel.app/api/chatbot/ask',
        { session_id: sessionId, message: input }
      );

      const botMessage: Message = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'bot', text: 'Error en la respuesta del chatbot.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Manejar la tecla Enter para enviar el mensaje
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Alternar minimización del chatbot
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {isMinimized ? (
        <button
          onClick={toggleMinimize}
          className="fixed bottom-4 right-4 bg-red-800 text-white p-5 rounded-full shadow-lg z-50"
        >
          <FaComments size={32} />
        </button>
      ) : (
        <div className="fixed bottom-0 right-0 m-4 w-[400px] h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex flex-col">
          <div className="p-4 bg-red-900 text-white font-bold rounded-t-lg flex justify-between items-center">
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
                  message.sender === 'bot' ? 'bg-red-100 text-left' : 'bg-gray-300 text-right'
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
              onKeyPress={handleKeyPress}
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
              placeholder="Escribe tu pregunta..."
              disabled={loading || !sessionId} // Deshabilitar si no hay session_id
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-800 text-white p-2 rounded"
              disabled={loading || !sessionId} // Deshabilitar si no hay session_id o está cargando
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
