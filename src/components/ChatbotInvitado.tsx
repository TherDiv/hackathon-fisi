// src/components/ChatbotInvitado.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaComments, FaWindowMinimize } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown'; // Importar ReactMarkdown

interface Message {
  sender: 'bot' | 'user';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  const chatbotRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const startWidth = useRef<number>(400); // Width inicial
  const startHeight = useRef<number>(500); // Height inicial

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

      setSessionId(response.data.session_id);
      setMessages([{ sender: 'bot', text: response.data.message }]);
      setError(null); // Limpiar errores si la sesión inicia correctamente
    } catch (error) {
      console.error('Error al iniciar la sesión:', error);
      setError('No se pudo iniciar la sesión con el chatbot.'); // Mensaje de error
    }
  };

  useEffect(() => {
    startNewSession();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null); // Limpiar errores antes de enviar un mensaje

    try {
      const response = await axios.post<AskResponse>(
        'https://vercel-backend-flame.vercel.app/api/chatbot/ask',
        {
          usuario_id: 'guest',
          session_id: sessionId,
          message: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage: Message = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      const errorMessage: Message = {
        sender: 'bot',
        text: 'Error en la respuesta del chatbot. Por favor, intenta de nuevo.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError('Hubo un problema con la comunicación con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Inicia el redimensionamiento
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    if (chatbotRef.current) {
      startWidth.current = chatbotRef.current.offsetWidth;
      startHeight.current = chatbotRef.current.offsetHeight;
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Redimensionar la ventana
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !chatbotRef.current) return;

    const dx = startX.current - e.clientX;
    const dy = startY.current - e.clientY;

    chatbotRef.current.style.width = `${startWidth.current + dx}px`;
    chatbotRef.current.style.height = `${startHeight.current + dy}px`;
  };

  // Finaliza el redimensionamiento
  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
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
        <div
          ref={chatbotRef}
          className="fixed bottom-0 right-0 m-4 bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex flex-col"
          style={{ width: "400px", height: "500px" }}
        >
          <div className="p-4 bg-red-800 text-white font-bold rounded-t-lg flex justify-between items-center relative">
            <span>Chat Invitado</span>
            <button onClick={toggleMinimize} className="text-white">
              <FaWindowMinimize size={16} />
            </button>
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 left-0 cursor-nwse-resize p-2"
              style={{ cursor: "nwse-resize" }}
            />
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
                {/* Usar ReactMarkdown para mostrar texto formateado */}
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            ))}

            {/* Mostrar mensaje de error si existe */}
            {error && <p className="text-red-700 text-center mt-4">{error}</p>}
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
              disabled={loading || !sessionId}
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-800 text-white p-2 rounded"
              disabled={loading || !sessionId}
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
