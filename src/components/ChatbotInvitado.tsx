// src/components/ChatbotInvitado.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaComments, FaWindowMinimize } from 'react-icons/fa';

interface Message {
  sender: 'bot' | 'user'; // Restricción de tipos, solo puede ser 'bot' o 'user'
  text: string;
}

interface AskResponse {
  response: string;
}

const ChatbotInvitado: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [loading, setLoading] = useState(false);

  // Función para enviar un mensaje y recibir respuesta del backend
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input }; // Correcto: 'user' como valor para sender
    setMessages((prev) => [...prev, userMessage]); // Correcto: previene el error de typescript

    setInput('');
    setLoading(true);

    try {
      const response = await axios.post<AskResponse>('https://vercel-backend-flame.vercel.app/api/chatbot/ask', {
        message: input,
      });

      const botMessage: Message = { sender: 'bot', text: response.data.response }; // Correcto: 'bot' como valor para sender
      setMessages((prev) => [...prev, botMessage]); // Correcto: previene el error de typescript
    } catch (error) {
      const errorMessage: Message = { sender: 'bot', text: 'Error en la respuesta del chatbot.' }; // Correcto: 'bot' como sender
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
                className={`mb-2 p-2 rounded ${message.sender === 'bot' ? 'bg-red-100 text-left' : 'bg-gray-300 text-right'}`}
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
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-800 text-white p-2 rounded"
              disabled={loading}
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
