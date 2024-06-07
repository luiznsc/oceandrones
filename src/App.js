import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './componentes/home/home';
import Login from './componentes/login/login';
import Cadastro from './componentes/cadastro/cadastro';
import Homeuser from './componentes/homeuser/homeuser';
import ExpeditionRequest from './componentes/expeditionRequest/expeditionRequest';


export default function App() {

  return (
    <BrowserRouter>
      <div className='tudo'>
        <Helmet>
          <meta charSet='utf-8'/>
          <title>OceanDrones</title>
        </Helmet>

        <Routes>
          <Route path='/' element={<>
            <Home />
          </>} />

          <Route path='/login' element={<>
              <Login />
          </>}/>

          <Route path='/cadastro' element={<>
            <Cadastro />
          </>} />

          <Route path='/homeuser' element={<>
            <Homeuser />
          </>} />

          <Route path='/expeditionrequest' element={<>
            <ExpeditionRequest />
          </>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
