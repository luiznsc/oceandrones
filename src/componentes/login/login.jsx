import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/header';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('Informe o e-mail.'),
        password: Yup.string().required('Informe a senha.'),
    });

    const handleEmailChange = (event) => {
      setemail(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setpassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Reseta o estado de erro ao submeter o formulário
    
        try {
            await schema.validate({ email, password }, { abortEarly: false });
    
            const situacaoEmpresa = 'ATIVA';
            const response = await axios.get('http://localhost:8080/empresas/buscar', {
                params: { email, password, situacaoEmpresa },
            });

            const empresa = response.data;
            if (empresa && empresa.situacaoEmpresa === 'ATIVA') {
                toast.success('Login realizado com sucesso!');
                setTimeout(() => {
                    navigate('/teste');
                }, 2000);
            } else {
                toast.error('Empresa Inativa.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
            } else if (error.request) {
                toast.error('Sem resposta do servidor.');
            } else {
                toast.error('Erro na configuração da requisição.');
            }
            toast.error('Dados de acesso não encontrados no banco de dados.');
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
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
      </>
  );
}

export default Login;