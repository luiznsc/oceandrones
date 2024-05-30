import { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/header';

export default function Cadastro() {
    const navigate = useNavigate();

    const [nomeUsuario, setnomeUsuario] = useState('');
    const [sobrenomeUsuario, setsobrenomeUsuario] = useState('');
    const [cpfUsuario, setcpfUsuario] = useState('');
    const [telUsuario, settelUsuario] = useState('');
    const [emailUsuario, setemailUsuario] = useState('');
    const [senhaUsuario, setsenhaUsuario] = useState('');
    const [confirmSenhaUsuario, setconfirmSenhaUsuario] = useState('');


    const schema = Yup.object().shape({
        nomeUsuario: Yup.string().required('Nome do usuário é obrigatório'),
        sobrenomeUsuario: Yup.string().required('Sobrenome do usuário é obrigatório'),
        cpfUsuario: Yup.string().required('CNPJ da empresa é obrigatório').max(14)
            .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido. Formato esperado: XXx.XXX.XXX-XX'),
        telUsuario: Yup.string().required('Telefone da empresa é obrigatório')
            .matches(/^(\(?\d{2}\)?\s?)?\d{4,5}\-\d{4}$/, 'Número telefon/celular inválido. Formato esperado: (XX) XXXX-XXXX ou XXXXX-XXXX'),
        emailUsuario: Yup.string().email('E-mail inválido').required('E-mail é obrigatório')
            .matches(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/, 'E-mail inválido'),
        senhaUsuario: Yup.string().required("Preencha o campo senha")
                    .min(8, 'A senha deve ter no mínimo 8 caracteres')
                    .max(8, 'A senha deve ter no máximo 8 caracteres')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter pelo menos um caractere especial, uma letra maiúscula e um número'),
        confirmSenhaUsuario: Yup.string().required('Confirme a senha')
                    .oneOf([Yup.ref('senhaUsuario'), null], 'As senhas devem ser iguais')
    });



    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await schema.validate({ nomeUsuario, sobrenomeUsuario, cpfUsuario, telUsuario, emailUsuario, senhaUsuario});
        } catch (err) {
            toast.error(err.errors[0]);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/empresas/cadastrar', { nomeUsuario, sobrenomeUsuario, cpfUsuario, telUsuario, emailUsuario, senhaUsuario });
                console.log(response.status.sucess);
                if (response.status === 200) {
                  toast.success('Cadastro realizado com sucesso!');
                  setTimeout(() => {
                    navigate('/login');
                }, 2000);
              } else {
                 toast.error('Não foi possível realizar o cadastro.');
              }
        } catch (error) {
            toast.error('Não foi possível realizar o cadastro.');
        }
    };


  return (
    <>
        <Header></Header>


        <div className="flex flex-col items-center justify-center w-full max-w-md min-h-screen py-10 sm:py-24 lg:w-3/5 mx-auto">
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    className="mx-auto h-50 w-auto"
                    src="/imgs/oceandrones_logo.png"
                    alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Cadastre sua conta
                    </h2>
                </div>
            </div>
            


            <form onSubmit={handleFormSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-2">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Informações pessoais</h2>
                        <div className="mt-2 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nome
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={nomeUsuario}
                                    onChange={(e) => setnomeUsuario(e.target.value)}/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Sobrenome
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={sobrenomeUsuario}
                                    onChange={(e) => setsobrenomeUsuario(e.target.value)}/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                                    CPF
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    placeholder='000.000.000-00'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={cpfUsuario}
                                    onChange={(e) => setcpfUsuario(e.target.value)}/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
                                    Telefone/Celular
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="telefone-celular"
                                    id="telUsuario"
                                    autoComplete="number"
                                    placeholder='(00) 00000-0000'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={telUsuario}
                                    onChange={(e) => settelUsuario(e.target.value)}/>
                                </div>
                            </div>



                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    E-mail
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder='seumelhoremail@gmail.com'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={emailUsuario}
                                    onChange={(e) => setemailUsuario(e.target.value)}/>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={senhaUsuario}
                                    onChange={(e) => setsenhaUsuario(e.target.value)}/>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirme sua senha
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="password-confirm"
                                    name="password-confirm"
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={confirmSenhaUsuario}
                                    onChange={(e) => setconfirmSenhaUsuario(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" href='/'>
                        Cancelar
                        </button>

                        <button
                        type="submit"
                        className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
                        >
                        Cadastrar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}