import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/header';
import Popup from 'reactjs-popup';
import {FaCheck} from 'react-icons/fa';

const Login = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('Informe o e-mail.'),
        password: Yup.string().required('Informe a senha.'),
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Reseta o estado de erro ao submeter o formulário
    
        try {
            await schema.validate({ email, password }, { abortEarly: false });
              setErrorEmail('');
              setErrorPassword('');
        } catch (err){
            err.inner.forEach((error) => {
              switch (error.path) {
                  case 'email':
                      setErrorEmail(error.message);
                      break;
                  case 'password':
                      setErrorPassword(error.message);
                      break;
                  default:
              }
            });
              console.error(err.errors[0]);
              return;
          }


          try {
            const response = await axios.get('http://localhost:8080/usuarios/buscar', {
              params: { email, password }});
              console.log(response.status.sucess);

            if (response.status === 200) {
                setIsOpen(true);
                setTimeout(() => {
                    navigate('/homeuser');
                }, 2000);
            } else {
                toast.error('Não foi possível realizar o login.');
            }

        } catch (error) {
            toast.error('Não foi possível realizar o login.');
        }

    };
    return (
      <>
        <Header></Header>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-50 w-auto"
              src="/imgs/oceandrones_logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Entre em sua conta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleFormSubmit} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                      setErrorEmail('');}}/>
                      {errorEmail && <p style={{color: 'red', fontSize: '12px'}}>{errorEmail}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-blue-700 hover:text-blue-500">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                      setErrorPassword('');}}/>
                      {errorPassword && <p style={{color: 'red', fontSize: '12px'}}>{errorPassword}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Entrar
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Não tem uma conta?{' '}
              <a href="/cadastro" className="font-semibold leading-6 text-blue-700 hover:text-blue-500">
                Cadastre-se agora
              </a>
            </p>
          </div>
        </div>

      {/* Modal de confirmação de cadastro */}
      {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Popup 
                open={isOpen} 
                closeOnDocumentClick 
                onClose={() => setIsOpen(false)}
                contentStyle={{
                    width: '40%',
                    borderRadius: '20px',
                    padding: '20px',
                }}
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="bg-white rounded-lg p-5 fle">
                    <div className="bg-white rounded-lg p-5 flex flex-col items-center">
                        <div className="background bg-green-500 rounded-full h-16 w-16 flex items-center justify-center">
                          <FaCheck className='mx-auto'/>
                        </div>
                    </div>
                    <h3 className="text-center text-lg font-bold text-gray-900 mt-4">Login realizado com sucesso!</h3>
                </div>
            </Popup>
          </div>
          )}
      </>
  );
}

export default Login;