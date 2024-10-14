// src/components/PaginaFisi.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatbotInvitado from './ChatbotInvitado'; // Importa el chatbot de invitados

export default function PaginaFisi() {
  const navigate = useNavigate();

  // Función para manejar el clic en "Foro Estudiantil" y redirigir a /login
  const handleForoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-[#6b1d1d] text-white py-3">
        <div className="container mx-auto flex justify-between items-center">
          <img src="images/logo-fisi.png" alt="FISI Logo" width={250} height={250} className="mr-4" />
          <nav>
            <ul className="flex space-x-4">
              {['Facultad', 'Pregrado', 'Posgrado', 'Investigación', 'Docentes', 'Estudiantes', 'Egresados', 'CERSEU'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
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
      <main>
        {/* Banner estilo w-full */}
        <div className="bg-[#6b1d1d] text-white">
          <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Asesoramiento en la prevención de la depresión
              </h1>
              <p className="bg-[#4a1414] p-4 rounded">
                La Unidad de Asesoría y Orientación al Estudiante - FISI, brinda
                asesoramiento de prevención de la depresión. Con el propósito de
                brindarte herramientas efectivas y prácticas para combatirla.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              {/* Reemplaza Image por img */}
              <img
                src="images/banner.png"
                alt="Previniendo la Salud Mental - UNAYOE FISI"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Anuncios */}
        <section className="m-8">
          <h2 className="text-xl font-bold mb-4">Anuncios Importantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Comunicado: Vigencia del Bachillerato Automático',
                content: 'Se informa a los alumnos de la Facultad de Ingeniería de Sistemas e Informática, que el 30 de diciembre de 2023...',
              },
              {
                title: 'Comunicado sobre Declaración Jurada de Intereses',
                content: 'FUNCIONARIOS Y SERVIDORES PÚBLICOS DE LA UNMSM QUE DECLARAN CINCO O MENOS PARIENTES EN SU DECLARACIÓN JURADA...',
              },
              {
                title: 'Documento: Código de Ética y Política de Conflicto',
                content: 'Se informa a la comunidad académica de la UNMSM sobre la política de conflicto de intereses y código de ética...',
              },
              {
                title: 'Requisitos para tramitar el Grado Académico',
                content: 'Se informa sobre los requisitos para tramitar el Grado Académico de Bachiller y el Título Profesional...',
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
        <section className="m-8">
          <h2 className="text-xl font-bold mb-4">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Biblioteca',
                description: 'La biblioteca de la Facultad ofrece recursos para facilitar y proveer...',
                image: 'images/biblioteca.jpg' // Imagen para Biblioteca
              },
              {
                title: 'Bienestar',
                description: 'La Unidad de Bienestar promueve la calidad de vida mediante servicios y programas...',
                image: 'images/bienestar.jpg' // Imagen para Bienestar
              },
              {
                title: 'CENPRO',
                description: 'El Centro de Producción desarrolla actividades de producción de bienes y servicios...',
                image: 'images/cenpro.jpg' // Imagen para CENPRO
              },
              {
                title: 'Estadística e Informática',
                description: 'Asesoramiento informático a las diversas unidades que conforman la Facultad...',
                image: 'images/estadistica.jpg' // Imagen para Estadística e Informática
              },
              {
                title: 'UNAYOE',
                description: 'La Unidad de Asesoría y Orientación ofrece apoyo académico a los estudiantes...',
                image: 'images/unayoe.jpg' // Imagen para UNAYOE
              },
              {
                title: 'OCAA',
                description: 'La Oficina de Calidad Académica y Acreditación garantiza la calidad en la Facultad...',
                image: 'images/ocaa.jpg' // Imagen para OCAA
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <img src={service.image} alt={service.title} width={300} height={300} className="mb-4 rounded" />
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#6b1d1d] text-white p-4">
        <div className="container mx-auto flex justify-center space-x-4">
          {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp', 'Telegram'].map((social, index) => (
            <a key={index} href="#" className="hover:underline">
              {social}
            </a>
          ))}
        </div>
      </footer>

      {/* Chatbot de Invitados */}
      <ChatbotInvitado />
    </div>
  );
}
