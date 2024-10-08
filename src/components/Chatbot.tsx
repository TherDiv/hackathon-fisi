// src/components/Chatbot.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaComments, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown'; // Importamos react-markdown
import rehypeRaw from 'rehype-raw'; // Importamos rehypeRaw para permitir HTML

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

  const startSession = async () => {
    try {
      const response = await axios.post<NewSessionResponse>(
        'https://vercel-backend-flame.vercel.app/api/new-session'
      );
      setSessionId(response.data.session_id);
      setMessages([{ sender: 'bot', text: response.data.message }]);
    } catch (error) {
      console.error('Error al iniciar la sesión:', error);
    }
  };

  useEffect(() => {
    startSession();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;
  
    // Añadimos el mensaje del usuario
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);
  
    try {
      // Realizamos la solicitud al backend
      const response = await axios.post<AskResponse>(
        'https://vercel-backend-flame.vercel.app/api/ask',
        {
          session_id: sessionId,
          message: input,
        }
      );
      
      // Accedemos a la respuesta del bot en la propiedad 'response'
      const botMessage = response.data.response;  // Aquí verificamos que sea 'response'
      
      console.log('Respuesta del bot:', botMessage);  // Verificamos en la consola el contenido de la respuesta
      
      // Actualizamos los mensajes para mostrar el mensaje del bot
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botMessage }]);
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
  

  const endSession = async () => {
    if (!sessionId) return;

    try {
      await axios.post('https://vercel-backend-flame.vercel.app/api/end-session', {
        session_id: sessionId,
      });
      setSessionId(null);
      setMessages([]);
    } catch (error) {
      console.error('Error al finalizar la sesión:', error);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {isMinimized ? (
        <button
          onClick={toggleMinimize}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-5 rounded-full shadow-lg z-50"
        >
          <FaComments size={32} />
        </button>
      ) : (
        <div className="fixed bottom-0 right-0 m-4 w-[400px] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
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
                {/* Usamos ReactMarkdown para renderizar los mensajes del bot */}
                {message.sender === 'bot' ? (
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.text}</ReactMarkdown>
                ) : (
                  <span>{message.text}</span>
                )}
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
