import React from 'react'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../header/header'

const navigation = [
  { name: 'Quem somos', href: '#' },
  { name: 'Comunidade', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      
      <div className="flex flex-col h-screen overflow-hidden bg-white">
        <Header></Header>

        {/* <!-- CONTEUDO CENTRAL --> */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">

            {/* <!-- BACKGROUND DESFOCADO CIMA --> */}
            <div
                className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
                
                <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2a44d5] to-[#00d4ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                />
            </div>

            {/* <!-- DIV DO LOGO E BTN --> */} 
            <div className="flex flex-col items-center justify-center min-h-screen py-10 sm:py-24">
                {/* <!-- LOGO --> */} 
                <img
                    className="h-200 w-auto mb-50" // Ajuste o tamanho aqui
                    src="/imgs/oceandrones_logo.png"
                    alt="Logotipo da OceanDrones"
                />
                {/* <!-- BTN --> */} 
                <div className="space-x-4">
                    <a href="/login" className="inline-block rounded-md bg-blue-600 px-8 py-3 text-md font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                        Começar
                    </a>
                    <a href="/quemsomos" className="inline-block rounded-md border border-transparent bg-white px-8 py-3 text-md font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                        Saiba mais
                    </a>
                </div>
            </div>

            {/* <!-- BACKGROUND DESFOCADO BAIXO--> */}
            <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
              <div
                className="absolute left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#2a44d5] to-[#00d4ff] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
      </div>
    </>
  )
}
