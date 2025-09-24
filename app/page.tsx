'use client';

import { useState } from 'react';
import { Car } from '@/types';
import ChatInterface from '@/components/ChatInterface';
import { Car as CarIcon, MessageSquare, Sparkles } from 'lucide-react';

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const handleCarInterested = (car: Car) => {
    setSelectedCar(car);
    setShowInterestModal(true);
  };

  const closeModal = () => {
    setShowInterestModal(false);
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <CarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Car Search AI
                </h1>
                <p className="text-sm text-gray-600">
                  Buscador Inteligente de Carros
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>Powered by Smart AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
          
          {/* Welcome Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bem-vindo!
              </h2>
              <p className="text-gray-600 mb-4">
                Encontre o carro ideal com nosso assistente de IA inteligente.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Como funciona:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    Digite o que você procura
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    Receba sugestões personalizadas
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    Demonstre interesse no carro
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Exemplos de busca:
                </h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>"Quero um BYD Dolphin em São Paulo"</p>
                  <p>"Carro até R$ 100 mil"</p>
                  <p>"SUV para família"</p>
                  <p>"Algo econômico em Curitiba"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <ChatInterface onCarInterested={handleCarInterested} />
          </div>
        </div>
      </main>

      {/* Interest Modal */}
      {showInterestModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Interesse Registrado! 🎉
            </h3>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Você demonstrou interesse no:
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-gray-900">
                  {selectedCar.Name} {selectedCar.Model}
                </p>
                <p className="text-gray-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(selectedCar.Price)}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedCar.Location}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Em breve, um de nossos consultores entrará em contato para 
              agendar uma visita e test drive!
            </p>

            <button
              onClick={closeModal}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continuar Buscando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}