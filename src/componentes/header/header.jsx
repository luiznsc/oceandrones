import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [itemMenu, setItemMenu] = useState('Entrar');
  const [itemHref, setItemHref] = useState('/login');
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/') {
      setItemMenu('Entrar');
      setItemHref('/login');
    }
    else if (location.pathname === '/login') {
      setItemMenu('Cadastrar');
      setItemHref('/cadastro');
    }
  }, [location]);



  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">OceanDrones</span>
            <img className="h-10 w-auto" src="/imgs/minilogo_oceandrones.png" alt="" />
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        


        {/* <!-- MENU DESKTOP --> */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Quem somos
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Comunidade
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Contribua
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href={itemHref}className="text-sm font-semibold leading-6 text-gray-900">
            {itemMenu} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* <!-- MENU MOBILE --> */}
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">OceanDrones</span>
              <img
                className="h-8 w-auto"
                src="/imgs/minilogo_oceandrones.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Quem somos
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Comunidade
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contribua
                </a>
              </div>
              <div className="py-6">
                <a
                  href={itemHref}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  {itemMenu}
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
