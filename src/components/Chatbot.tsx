// src/components/Chatbot.tsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaComments, FaTimes } from "react-icons/fa";
import { FaWindowMinimize } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface Message {
  sender: "bot" | "user";
  text: string;
}

interface Session {
  session_id: string;
  messages: Message[];
  date: string;
  title: string;
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
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");
  const [chatHistory, setChatHistory] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const usuario_id = localStorage.getItem("usuario_id");

  useEffect(() => {
    if (!usuario_id) {
      navigate("/login");
      return;
    }
    startSession();
  }, []);

  const startSession = async () => {
    try {
      const response = await axios.post<NewSessionResponse>(
        "https://vercel-backend-flame.vercel.app/api/chatbot/new-session",
        { usuario_id },
        { headers: { "Content-Type": "application/json" } }
      );
      setSessionId(response.data.session_id);
      setMessages([{ sender: "bot", text: response.data.message }]);
    } catch (error) {
      console.error("Error al iniciar la sesión:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post<AskResponse>(
        "https://vercel-backend-flame.vercel.app/api/chatbot/ask",
        { session_id: sessionId, message: input, usuario_id },
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
  };

  const handleDeleteSession = async (session_id: string) => {
    try {
      await axios.post(
        "https://vercel-backend-flame.vercel.app/api/chatbot/delete-my-session",
        {
          usuario_id,
          session_id,
        }
      );

      setChatHistory((prevHistory) =>
        prevHistory.filter((session) => session.session_id !== session_id)
      );
    } catch (error) {
      console.error("Error al eliminar la sesión:", error);
    }
  };

  const endSession = async () => {
    if (!usuario_id) return;

    try {
      const title = `${messages[0]?.text || "tema"}`;

      const currentSession: Session = {
        session_id: sessionId!,
        messages: messages,
        date: new Date().toLocaleString(),
        title,
      };

      await axios.post(
        "https://vercel-backend-flame.vercel.app/api/chatbot/delete-my-session",
        {
          usuario_id,
          session_id: sessionId,
        }
      );

      setChatHistory((prevHistory) => [...prevHistory, currentSession]);

      setSessionId(null);
      setMessages([]);

      startSession();
    } catch (error) {
      console.error("Error al terminar la sesión:", error);
    }
  };

  // Resizing Functionality
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const chatWindow = chatWindowRef.current;
    if (chatWindow) {
      const startWidth = chatWindow.offsetWidth;
      const startHeight = chatWindow.offsetHeight;
      const startX = e.clientX;
      const startY = e.clientY;

      const doDrag = (moveEvent: MouseEvent) => {
        chatWindow.style.width = `${startWidth + moveEvent.clientX - startX}px`;
        chatWindow.style.height = `${startHeight + moveEvent.clientY - startY}px`;
      };

      const stopDrag = () => {
        window.removeEventListener("mousemove", doDrag);
        window.removeEventListener("mouseup", stopDrag);
      };

      window.addEventListener("mousemove", doDrag);
      window.addEventListener("mouseup", stopDrag);
    }
  };

  return (
    <>
      {isMinimized ? (
        <button
          onClick={toggleMinimize}
          className="fixed bottom-4 right-4 bg-sky-800 text-white p-5 rounded-full shadow-lg z-50">
          <FaComments size={32} />
        </button>
      ) : (
        <div
          ref={chatWindowRef}
          className="fixed bottom-0 right-0 m-4 bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex flex-col overflow-auto"
          style={{ width: "400px", height: "500px", resize: "none" }}
        >
          <div className="p-4 bg-sky-900 text-white font-bold rounded-t-lg flex justify-between items-center cursor-move">
            <span>¡Pregunta Fisiano!</span>
            <button onClick={toggleMinimize} className="text-white">
              <FaWindowMinimize size={14} />
            </button>
          </div>

          <div className="absolute top-0 left-0 cursor-nwse-resize" 
               style={{ width: "10px", height: "10px", zIndex: 1000 }}
               onMouseDown={handleResizeMouseDown}></div>

          <div className="flex justify-between border-b">
            <button
              className={`p-2 w-1/2 text-center ${
                activeTab === "new" ? "border-b-2 border-sky-600 font-bold" : ""
              }`}
              onClick={() => {
                setActiveTab("new");
                setSelectedSession(null);
              }}
            >
              Nueva Conversación
            </button>
            <button
              className={`p-2 w-1/2 text-center ${
                activeTab === "history" ? "border-b-2 border-sky-600 font-bold" : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              Historial
            </button>
          </div>

          {/* Chat UI */}
          {activeTab === "new" ? (
            <div className="flex-grow p-4 h-64 min-h-[200px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${
                    message.sender === "bot" ? "bg-sky-100 text-left" : "bg-gray-300 text-right"
                  }`}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
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
                    message.sender === "bot" ? "bg-sky-100 text-left" : "bg-gray-300 text-right"
                  }`}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow p-4 h-64 min-h-[200px] overflow-y-auto">
              {chatHistory.map((session) => (
                <div key={session.session_id}>
                  <button onClick={() => handleSelectSession(session)}>
                    {session.title}
                  </button>
                  <button onClick={() => handleDeleteSession(session.session_id)}>
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {sessionId && (
            <div className="p-4 border-t flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow p-2 border border-gray-300 rounded mr-2"
                placeholder="Escribe tu pregunta..."
              />
              <button onClick={handleSendMessage} className="bg-sky-800 text-white p-2 rounded">
                {loading ? "..." : "Enviar"}
              </button>
              <button onClick={endSession} className="bg-red-600 text-white ml-2 p-2 rounded">
                Terminar Sesión
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;