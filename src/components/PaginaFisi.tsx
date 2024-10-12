// src/components/PaginaFisi.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatbotInvitado from './ChatbotInvitado'; // Importa el chatbot de invitados

export default function PaginaFisi() {
  const navigate = useNavigate(); // Reemplaza useRouter con useNavigate de react-router-dom

  // Función para manejar el clic en "Facultad" y redirigir a /login
  const handleFacultadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/login'); // Redirige a la página de login
  };

  // Función para manejar el clic en "Foro Estudiantil" y redirigir a /login
  const handleForoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-[#6b1d1d] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img src="/logo.png" alt="Faculty Logo" width={50} height={50} className="mr-4" /> {/* Reemplaza Image por img */}
          <nav>
            <ul className="flex space-x-4">
              {['Facultad', 'Pregrado', 'Posgrado', 'Investigación', 'Docentes', 'Estudiantes', 'Egresados', 'CERSEU'].map((item) => (
                <li key={item}>
                  {/* Reemplaza Link de next.js con <a> y manejador de eventos */}
                  <a href="#" onClick={item === 'Facultad' ? handleFacultadClick : undefined} className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
              {/* Nuevo apartado Foro Estudiantil */}
              <li>
                <a href="#" onClick={handleForoClick} className="hover:underline font-bold">
                  Foro Estudiantil
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-8">
        {/* Banner */}
        <div className="bg-[#6b1d1d] text-white p-8 flex justify-between items-center mb-8 rounded-lg shadow-lg">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Inicio del Programa de Titulación por Trabajo de Suficiencia Profesional 2024
            </h1>
            <p className="text-lg">Estimado(a) Bachiller</p>
          </div>
          <img src="/banner.png" alt="Program Banner" width={300} height={200} /> {/* Reemplaza Image por img */}
        </div>

        {/* Announcements */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Anuncios Importantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Comunicado: Vigencia del Bachillerato Automático',
                content:
                  'Se informa a los alumnos de la Facultad de Ingeniería de Sistemas e Informática, que el 30 de diciembre de 2023...',
              },
              {
                title: 'Comunicado sobre Declaración Jurada de Intereses',
                content:
                  'FUNCIONARIOS Y SERVIDORES PÚBLICOS DE LA UNMSM QUE DECLARAN CINCO O MENOS PARIENTES EN SU DECLARACIÓN JURADA...',
              },
              {
                title: 'Documento: Código de Ética y Política de Conflicto',
                content:
                  'Se informa a la comunidad académica de la UNMSM sobre la política de conflicto de intereses y código de ética...',
              },
              {
                title: 'Requisitos para tramitar el Grado Académico',
                content:
                  'Se informa sobre los requisitos para tramitar el Grado Académico de Bachiller y el Título Profesional...',
              },
            ].map((announcement, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="font-bold mb-2 text-[#6b1d1d]">IMPORTANTE</h3>
                <h4 className="font-semibold mb-1">{announcement.title}</h4>
                <p className="text-sm text-gray-700">{announcement.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Biblioteca', description: 'La biblioteca de la Facultad ofrece recursos para facilitar y proveer...' },
              { title: 'Bienestar', description: 'La Unidad de Bienestar promueve la calidad de vida mediante servicios y programas...' },
              { title: 'CENPRO', description: 'El Centro de Producción desarrolla actividades de producción de bienes y servicios...' },
              { title: 'Estadística e Informática', description: 'Asesoramiento informático a las diversas unidades que conforman la Facultad...' },
              { title: 'UNAYOE', description: 'La Unidad de Asesoría y Orientación ofrece apoyo académico a los estudiantes...' },
              { title: 'OCAA', description: 'La Oficina de Calidad Académica y Acreditación garantiza la calidad en la Facultad...' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <img src="/service-placeholder.png" alt={service.title} width={200} height={150} className="mb-4 rounded" /> {/* Reemplaza Image por img */}
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#6b1d1d] text-white mt-8 p-4">
        <div className="container mx-auto flex justify-center space-x-6">
          {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp', 'Telegram'].map((social, index) => (
            <a key={index} href="#" className="hover:underline">
              {social}
            </a>
          ))}
        </div>
      </footer>

      {/* Chatbot de Invitados */}
      <ChatbotInvitado /> {/* Añade el chatbot de invitados */}
    </div>
  );
}
