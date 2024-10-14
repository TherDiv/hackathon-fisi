// src/components/Chatbot.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaComments, FaTimes } from "react-icons/fa";
import { FaWindowMinimize } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

interface Message {
  sender: "bot" | "user";
  text: string;
}

interface Session {
  session_id: string;
  messages: Message[];
  date: string;
  title: string; // Título generado por la IA para la sesión
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
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"new" | "history">("new"); // Pestaña activa (Nueva conversación o Historial)
  const [chatHistory, setChatHistory] = useState<Session[]>([]); // Historial de sesiones
  const [selectedSession, setSelectedSession] = useState<Session | null>(null); // Sesión seleccionada

  const navigate = useNavigate(); // Para redirigir al login si no está autenticado

  // Recuperar el usuario_id del localStorage
  const usuario_id = localStorage.getItem("usuario_id");

  useEffect(() => {
    // Verificar si el usuario está autenticado antes de iniciar la sesión
    if (!usuario_id) {
      alert("Debes iniciar sesión para usar el chatbot.");
      navigate("/login"); // Redirigir al login si no está autenticado
      return;
    }

    // Iniciar una nueva sesión al cargar el componente
    startSession();
  }, []);

  // Función para iniciar una nueva sesión de chat
  const startSession = async () => {
    try {
      const response = await axios.post<NewSessionResponse>(
        "https://vercel-backend-flame.vercel.app/api/chatbot/new-session",
        { usuario_id }, // Incluye el usuario_id en la solicitud
        { headers: { "Content-Type": "application/json" } }
      );
      setSessionId(response.data.session_id);
      setMessages([{ sender: "bot", text: response.data.message }]);
    } catch (error) {
      console.error("Error al iniciar la sesión:", error);
    }
  };

  // Función para enviar un mensaje al bot
  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post<AskResponse>(
        "https://vercel-backend-flame.vercel.app/api/chatbot/ask",
        { session_id: sessionId, message: input, usuario_id }, // Enviar el usuario_id
        { headers: { "Content-Type": "application/json" } }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Hubo un error al procesar tu solicitud." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Manejar la tecla Enter para enviar el mensaje
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Función para terminar la sesión actual y guardarla en el historial
  const endSession = async () => {
    if (!usuario_id) return;

    try {
      const title = `Consulta sobre ${messages[0]?.text || "tema"}`;

      const currentSession: Session = {
        session_id: sessionId!,
        messages: messages,
        date: new Date().toLocaleString(),
        title,
      };

      // Llamada al API para eliminar la sesión (opcional según el backend)
      await axios.post(
        "https://vercel-backend-flame.vercel.app/api/chatbot/delete-my-session",
        {
          usuario_id,
          session_id: sessionId,
        }
      );

      // Guardar la sesión en el historial
      setChatHistory((prevHistory) => [...prevHistory, currentSession]);

      // Reiniciar el estado
      setSessionId(null);
      setMessages([]);

      // Iniciar una nueva sesión automáticamente
      startSession();
    } catch (error) {
      console.error("Error al terminar la sesión:", error);
    }
  };

  // Función para eliminar una sesión del historial
  const handleDeleteSession = async (session_id: string) => {
    try {
      await axios.post(
        "https://vercel-backend-flame.vercel.app/api/chatbot/delete-my-session",
        {
          usuario_id,
          session_id,
        }
      );

      // Elimina la sesión del historial
      setChatHistory((prevHistory) =>
        prevHistory.filter((session) => session.session_id !== session_id)
      );
    } catch (error) {
      console.error("Error al eliminar la sesión:", error);
    }
  };

  // Minimizar o maximizar el chatbot
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Seleccionar una sesión del historial
  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
  };

  return (
    <>
      {isMinimized ? (
        <button
          onClick={toggleMinimize}
          className="fixed bottom-4 right-4 bg-red-800 text-white p-5 rounded-full shadow-lg z-50">
          <FaComments size={32} />
        </button>
      ) : (
        <div className="fixed bottom-0 right-0 m-4 w-[400px] h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex flex-col">
          <div className="p-4 bg-red-900 text-white font-bold rounded-t-lg flex justify-between items-center">
            <span>¡Pregunta Fisiano!</span>
            <button onClick={toggleMinimize} className="text-white">
              <FaWindowMinimize size={14} />
            </button>
          </div>

          <div className="flex justify-between border-b">
            <button
              className={`p-2 w-1/2 text-center ${
                activeTab === "new" ? "border-b-2 border-red-600 font-bold" : ""
              }`}
              onClick={() => {
                setActiveTab("new");
                setSelectedSession(null); // Resetea la selección cuando cambias a "Nueva Conversación"
              }}
            >
              Nueva Conversación
            </button>
            <button
              className={`p-2 w-1/2 text-center ${
                activeTab === "history"
                  ? "border-b-2 border-red-600 font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              Historial
            </button>
          </div>

          {activeTab === "new" ? (
            <div className="flex-grow p-4 h-64 min-h-[200px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${
                    message.sender === "bot"
                      ? "bg-red-100 text-left"
                      : "bg-gray-300 text-right"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          ) : selectedSession ? (
            <div className="flex-grow p-4 h-64 min-h-[200px] overflow-y-auto">
              <h3 className="font-bold">{selectedSession.title}</h3>
              <p className="text-xs text-gray-500">
                Fecha: {selectedSession.date}
              </p>
              {selectedSession.messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${
                    message.sender === "bot"
                      ? "bg-red-100 text-left"
                      : "bg-gray-300 text-right"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow p-4 h-64 min-h-[200px] overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className="border p-2 mb-2 rounded cursor-pointer relative"
                  onClick={() => handleSelectSession(chat)}
                >
                  <p className="font-bold">{chat.title}</p>
                  <p className="text-xs text-gray-500">Fecha: {chat.date}</p>
                  {/* Botón "X" para eliminar la sesión */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que se active la selección de la sesión
                      handleDeleteSession(chat.session_id);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "new" && sessionId && (
            <div className="p-4 border-t border-gray-300 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow p-2 border border-gray-300 rounded mr-2"
                placeholder="Escribe tu pregunta..."
                disabled={!sessionId || loading}
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-800 text-white p-2 rounded"
                disabled={!sessionId || loading}
              >
                {loading ? "..." : "Enviar"}
              </button>
              {sessionId && (
                <button
                  onClick={endSession}
                  className="bg-red-600 text-white ml-4 p-2 rounded"
                >
                  Terminar Sesión
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
