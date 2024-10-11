// src/components/Chatbot.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaComments, FaTimes } from 'react-icons/fa';

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

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new'); // Maneja las pestañas activas

  // Simulación del historial de chats (puedes obtener esto del backend)
  const [chatHistory] = useState([
    { title: 'TEMA 1', question: 'Pregunta 1', date: '10/10/2024', time: '10:00' },
    { title: 'TEMA 2', question: 'Pregunta 2', date: '11/10/2024', time: '11:00' },
    { title: 'TEMA 3', question: 'Pregunta 3', date: '12/10/2024', time: '12:00' },
  ]);

  // Función para iniciar una nueva sesión
  const startSession = async () => {
    try {
      const response = await axios.post<NewSessionResponse>(
        'https://vercel-backend-flame.vercel.app/api/new-session',
        {}, // Si no envías ningún dato en el cuerpo de la solicitud
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // TypeScript ahora sabe que response.data tiene el tipo NewSessionResponse
      setSessionId(response.data.session_id);
      setMessages([{ sender: 'bot', text: response.data.message }]);
    } catch (error) {
      console.error('Error al iniciar la sesión:', error);
    }
  };

  
  useEffect(() => {
    // Iniciar la sesión cuando se monta el componente
    startSession();
  }, []);

  // Función para enviar un mensaje al bot
  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post<AskResponse>(
        'https://vercel-backend-flame.vercel.app/api/ask',
        {
          session_id: sessionId,
          message: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // TypeScript ahora sabe que response.data tiene el tipo AskResponse
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: response.data.response }]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Hubo un error al procesar tu solicitud.' },
      ]);
    } finally {
      setLoading(false);
    }
  };


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
        // Ventana de chat abierta con pestañas
        <div className="fixed bottom-0 right-0 m-4 w-[400px] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="p-4 bg-red-900 text-white font-bold rounded-t-lg flex justify-between items-center">
            <span>¡Pregunta Fisiano!</span>
            <button onClick={toggleMinimize} className="text-white">
              <FaTimes size={24} />
            </button>
          </div>

          {/* Pestañas para cambiar entre nueva conversación e historial */}
          <div className="flex justify-between border-b">
            <button
              className={`p-2 w-1/2 text-center ${activeTab === 'new' ? 'border-b-2 border-red-600 font-bold' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              Nueva Conversación
            </button>
            <button
              className={`p-2 w-1/2 text-center ${activeTab === 'history' ? 'border-b-2 border-red-600 font-bold' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Historial
            </button>
          </div>

          {/* Contenido de las pestañas */}
          {activeTab === 'new' ? (
            <div className="p-4 h-[350px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${message.sender === 'bot' ? 'bg-red-100 text-left' : 'bg-gray-300 text-right'}`}
                >
                  {message.text}
                </div>
              ))}
              <div className="p-4 border-t border-gray-300 flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded mr-2"
                  placeholder="Escribe tu pregunta..."
                  disabled={!sessionId || loading}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-red-800 text-white p-2 rounded"
                  disabled={!sessionId || loading}
                >
                  {loading ? '...' : 'Enviar'}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 h-[350px] overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div key={index} className="border p-2 mb-2 rounded">
                  <p className="font-bold">{chat.title}</p>
                  <p>{chat.question}</p>
                  <p className="text-xs text-gray-500">{chat.date} - {chat.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;