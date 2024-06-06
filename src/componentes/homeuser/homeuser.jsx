import React from 'react';
import HeaderHomeUser from '../headerHomeUser/headerHomeUser';

const WelcomePage = ({ userName }) => {

  return (
    <>
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderHomeUser />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Bem-vindo, {userName}!</h1>
          <p className="text-gray-600 mb-6">Pronto para mais uma expedição?</p>
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Solicitar uma expedição
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Gerar relatório de expedição
            </button>
          </div>
        </div>
      </div>
    </div>


    </>
  );
};

export default WelcomePage;
