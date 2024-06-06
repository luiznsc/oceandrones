import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/header';
import Popup from 'reactjs-popup';
import {FaCheck} from 'react-icons/fa';


export default function Cadastro() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [nomeUsuario, setnomeUsuario] = useState('');
    const [sobrenomeUsuario, setsobrenomeUsuario] = useState('');
    const [cpfUsuario, setcpfUsuario] = useState('');
    const [telUsuario, settelUsuario] = useState('');
    const [emailUsuario, setemailUsuario] = useState('');
    const [senhaUsuario, setsenhaUsuario] = useState('');

    const [errorNome, setErrorNome] = useState('');
    const [errorSobrenome, setErrorSobrenome] = useState('');
    const [errorCpf, setErrorCpf] = useState('');
    const [errorTel, setErrorTel] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorSenha, setErrorSenha] = useState('');


    const schema = Yup.object().shape({
        nomeUsuario: Yup.string().required('Nome do usuário é obrigatório'),
        sobrenomeUsuario: Yup.string().required('Sobrenome do usuário é obrigatório'),
        cpfUsuario: Yup.string().required('CPF do usuário é obrigatório.').max(14)
            .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido.'),
        telUsuario: Yup.string().required('Telefone da empresa é obrigatório')
            .matches(/^(\(?\d{2}\)?\s?)?\d{4,5}\-\d{4}$/, 'Número telefone/celular inválido.'),
        emailUsuario: Yup.string().email('E-mail inválido').required('E-mail é obrigatório')
            .matches(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/, 'E-mail inválido'),
        senhaUsuario: Yup.string().required("Preencha o campo senha")
                    .min(8, 'A senha deve ter no mínimo 8 caracteres')
                    .max(8, 'A senha deve ter no máximo 8 caracteres'),
                        
    });



    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await schema.validate({ nomeUsuario, sobrenomeUsuario, cpfUsuario, telUsuario, emailUsuario, senhaUsuario}, { abortEarly: false });
            setErrorNome('');
            setErrorSobrenome('');
            setErrorCpf('');
            setErrorTel('');
            setErrorEmail('');
            setErrorSenha('');
        } catch (err) {
            err.inner.forEach((error) => {
                switch (error.path) {
                    case 'nomeUsuario':
                        setErrorNome(error.message);
                        break;
                    case 'sobrenomeUsuario':
                        setErrorSobrenome(error.message);
                        break;
                    case 'cpfUsuario':
                        setErrorCpf(error.message);
                        break;
                    case 'telUsuario':
                        setErrorTel(error.message);
                        break;
                    case 'emailUsuario':
                        setErrorEmail(error.message);
                        break;
                    case 'senhaUsuario':
                        setErrorSenha(error.message);
                        break;
                    default:   
                }
            });
            console.error(err.errors[0]);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/usuarios/cadastrar',
                { nomeUsuario, sobrenomeUsuario, cpfUsuario, telUsuario, emailUsuario, senhaUsuario });
            console.log(response.status.sucess);
            if (response.status === 200) {
                setIsOpen(true);
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

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form onSubmit={handleFormSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                            Nome
                            </label>
                            <input
                                type="text"
                                id="nomeUsuario"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={nomeUsuario}
                                onChange={(e) => {
                                    setnomeUsuario(e.target.value);
                                    setErrorNome('');}}/>
                                {errorNome && <p style={{color: 'red', fontSize: '12px'}}>{errorNome}</p>}

                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Sobrenome
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                id="sobrenomeUsuario"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={sobrenomeUsuario}
                                onChange={(e) => {
                                    setsobrenomeUsuario(e.target.value);
                                    setErrorSobrenome('');}}/>
                                {errorSobrenome && <p style={{color: 'red', fontSize: '12px'}}>{errorSobrenome}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                                CPF
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                id="cpfUsuario"
                                placeholder='000.000.000-00'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={cpfUsuario}
                                onChange={(e) => {
                                    setcpfUsuario(e.target.value);
                                    setErrorCpf('');}}/>
                                {errorCpf && <p style={{color: 'red', fontSize: '12px'}}>{errorCpf}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
                                Telefone/Celular
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                id="telUsuario"
                                placeholder='(00) 00000-0000'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={telUsuario}
                                onChange={(e) => {
                                    settelUsuario(e.target.value);
                                    setErrorTel('');}}/>
                                {errorTel && <p style={{color: 'red', fontSize: '12px'}}>{errorTel}</p>}
                            </div>
                        </div>



                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                E-mail
                            </label>
                            <div className="mt-2">
                                <input
                                id="emailUsuario"
                                type="email"
                                placeholder='seumelhoremail@gmail.com'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={emailUsuario}
                                onChange={(e) => {
                                    setemailUsuario(e.target.value);
                                    setErrorEmail('');}}/>
                                {errorEmail && <p style={{color: 'red', fontSize: '12px'}}>{errorEmail}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Senha
                            </label>
                            <div className="mt-2">
                                <input
                                id="senhaUsuario"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={senhaUsuario}
                                onChange={(e) => {
                                    setsenhaUsuario(e.target.value);
                                    setErrorSenha('');}}/>
                                {errorSenha && <p style={{color: 'red', fontSize: '12px'}}>{errorSenha}</p>}
                            </div>
                        </div>


                        <div className="flex space-x-4">
                            <button
                            onClick={handleFormSubmit}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                            Cadastrar
                            </button>
                            <button
                            type="button"
                            className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                            >
                            Cancelar
                            </button>
                        </div>
                    </form>
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
                    <div className="bg-white rounded-lg p-5">
                            <div className="bg-white rounded-lg p-5 flex flex-col items-center">
                                <div className="background bg-green-500 rounded-full h-16 w-16 flex items-center justify-center">
                                <FaCheck className='mx-auto'/>
                                </div>
                            </div>
                        <h3 className="text-center text-lg font-bold text-gray-900 mt-4">Cadastro realizado com sucesso!</h3>
                    </div>
                </Popup>
                </div>
            )}
    </>
  )
}