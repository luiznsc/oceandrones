import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function HeaderHomeUser() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [itemMenu, setItemMenu] = useState('Desconectar');
  const [itemHref, setItemHref] = useState('/home');
  const [itemHrefLogo, setItemHrefLogo] = useState('/homeuser');
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/homeuser') {
      setItemMenu('Desconectar');
      setItemHref('/');
    }
    if (location.pathname === '/expeditionrequest' || location.pathname === '/homeuser') {
      setItemHrefLogo('/homeuser');
    }
  }, [location]);



  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <a href={itemHrefLogo} className="-m-1.5 p-1.5">
          <span className="sr-only">OceanDrones</span>
          <img className="h-20 w-auto" src="/imgs/oceandrones_logo.png" alt="" />
        </a>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href={itemHref} className="text-sm font-semibold leading-6 text-gray-900">
            {itemMenu} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </header>

  )
}
