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
  message: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await axios.post<NewSessionResponse>('http://localhost:5000/new-session');
        setSessionId(response.data.session_id);
        setMessages([{ sender: 'bot', text: response.data.message }]);
      } catch (error) {
        console.error('Error al iniciar la sesión:', error);
      }
    };

    startSession();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post<AskResponse>('http://localhost:5000/ask', {
        session_id: sessionId,
        message: input,
      });

      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: response.data.message }]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Hubo un error al procesar tu solicitud.' }]);
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
        // Botón flotante para abrir el chatbot (círculo más grande)
        <button
          onClick={toggleMinimize}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-5 rounded-full shadow-lg z-50" // Aumentamos el padding a p-5
        >
          <FaComments size={32} /> {/* Tamaño del icono aumentado a 32px */}
        </button>
      ) : (
        // Ventana de chat abierta
        <div className="fixed bottom-0 right-0 m-4 w-[380px] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="p-4 bg-blue-500 text-white font-bold rounded-t-lg flex justify-between items-center">
            <span>Chatbot FISI</span>
            <button onClick={toggleMinimize} className="text-white">
              <FaTimes size={24} />
            </button>
          </div>
          <div className="p-4 h-[350px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  message.sender === 'bot' ? 'bg-blue-100 text-left' : 'bg-gray-300 text-right'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
              placeholder="Escribe un mensaje..."
              disabled={!sessionId || loading}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded"
              disabled={!sessionId || loading}
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
