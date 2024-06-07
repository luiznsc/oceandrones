import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import HeaderHomeUser from '../headerHomeUser/headerHomeUser';
import Popup from 'reactjs-popup';
import {FaCheck} from 'react-icons/fa';
import {FaTimes} from 'react-icons/fa';
import axios from 'axios';

export default function ExpeditionRequest () {
  const navigate = useNavigate();
  const [isOpenCheck, setisOpenCheck] = useState(false);
  const [isOpenError, setisOpenError] = useState(false);
  const [contador, setContador] = useState(Math.floor(Math.random() * (180 -60 + 1) + 60));

  const droneModels = [
    { value: 'IBUBBLE',
      label: 'Ibubble - Capacidade mergulho 60m, sem fio, controle remoto, bateria 1h, dimensões 60cm x 45cm 35cm',
      img : '/imgs/ibubble_drone.png'},

    { value: 'DTG3ROV',
      label: 'DTG3 Rov - Capacidade mergulho 200m, com fio, bateria 12h',
      img : '/imgs/dtg3rov_drone.png'},

    { value: 'GLADIUSMINI',
      label: 'Gladius Mini - Capacidade mergulho 100m, sem fio, controle remoto, bateria 2h, dimensões 385 x 226 x 138mm',
      img : '/imgs/gladius_mini.png'},

    { value: 'POWERRAY',
      label: 'PowerRay - Capacidade mergulho 30m, com fio, controle remoto, bateria 4h, dimensões 465 x 270 x 126mm',
      img : '/imgs/powerray_drone.png'},

    { value: 'TITANGENEINNO',
      label: 'Titan Geneinno - Capacidade mergulho 150m, com/sem fio, controle remoto, qualidade img 4k, dimensões 90 x 374 x 165',
      img : '/imgs/titan_geneinno.png'},
  ];

  const stateOption = [
    { value: 'AM', label: 'AM - Amazonas' },
    { value: 'PR', label: 'PR - Paraná' },
    { value: 'PE', label: 'PE - Pernambuco' },
    { value: 'RJ', label: 'RJ - Rio de Janeiro' },
    { value: 'RS', label: 'RS - Rio Grande do Sul' },
    { value: 'SC', label: 'SC - Santa Catarina' },
    { value: 'SP', label: 'SP - São Paulo' },
  ];


  const [selectedDroneModel, setSelectedDroneModel] = useState(null);
  const [selectedDroneImage, setSelectedDroneImage] = useState('');
  const [selectedState, setSelectedState] = useState(null);

  const [selectedPorto, setSelectedPorto] = useState(null);
  const [selectedTrajeto, setSelectedTrajeto] = useState(null);

  const [portoOptions, setPortoOptions] = useState([]);
  const [trajetoOptions, setTrajetoOptions] = useState([]);


  const handleDroneModelChange = (selectedOption) => { 
    setSelectedDroneModel(selectedOption);
    setSelectedDroneImage(selectedOption.img);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const handlePortoChange = (selectedOption) => {
    setSelectedPorto(selectedOption);
  };

  const handleTrajetoChange = (selectedOption) => {
    setSelectedTrajeto(selectedOption);
  };


  //PORTOS
  useEffect(() => {
    let newPortoOptions = [];
  
    if (selectedState?.value === 'AM') {
      newPortoOptions.push({ value: 'PORTOCHIBATAO', label: 'Porto Chibatão' });
    } else if (selectedState?.value === 'PR') {
      newPortoOptions.push({ value: 'PORTOPARANAGUA', label: 'Porto de Paranaguá' });
    } else if (selectedState?.value === 'PE') {
      newPortoOptions.push({ value: 'PORTOSUAPE', label: 'Porto de Suape' });
    } else if (selectedState?.value === 'RJ') {
      newPortoOptions.push({ value: 'PORTORIOJANEIRO', label: 'Porto do Rio de Janeiro' });
    } else if (selectedState?.value === 'RS') {
      newPortoOptions.push({ value: 'PORTORIOGRANDE', label: 'Porto de Rio Grande' });
    } else if (selectedState?.value === 'SC') {
      newPortoOptions.push({ value: 'PORTOITAPOA', label: 'Porto de Itapoá' });
      newPortoOptions.push({ value: 'PORTONAVE', label: 'Portonave' });
    } else if (selectedState?.value === 'SP') {
      newPortoOptions.push({ value: 'PORTOSANTOS', label: 'Porto de Santos' });
      newPortoOptions.push({ value: 'PORTOSAOSEBASTIAO', label: 'Porto de São Sebastião' });
    }
    setPortoOptions(newPortoOptions);
  }, [selectedState]);


  //TRAJETOS
  useEffect(() => {
    let newTrajetoOptions = [];
  
    if (selectedPorto?.value === 'PORTOCHIBATAO') {
      newTrajetoOptions.push({ value: 'TRAJETOPORTOCHIBATAO', label: 'Trajeto Chibatão' });
    } else if (selectedPorto?.value === 'PORTOPARANAGUA') {
      newTrajetoOptions.push({ value: 'TRAJETOPORTOPARANAGUA', label: 'Trajeto Paranaguá' });
    } else if (selectedPorto?.value === 'PORTOSUAPE') {
      newTrajetoOptions.push({ value: 'TRAJETOPORTOSUAPE', label: 'Trajeto Suape' });
    } else if (selectedPorto?.value === 'PORTORIOJANEIRO') {
      newTrajetoOptions.push({ value: 'TRAJETOPORTORIOJANEIRO', label: 'Trajeto Rio de Janeiro' });
    } else if (selectedPorto?.value === 'PORTORIOGRANDE') {
      newTrajetoOptions.push({ value: 'TRAJETOPORTORIOGRANDE', label: 'Trajeto Rio Grande' });
    } else if (selectedPorto?.value === 'PORTOITAPOA'){
      newTrajetoOptions.push({ value: 'TRAJETOPORTOITAPOA', label: 'Trajeto Itapoá' });
    } else if (selectedPorto?.value === 'PORTONAVE'){
      newTrajetoOptions.push({ value: 'TRAJETOPORTONAVE', label: 'Trajeto Portonave' })
    } else if (selectedPorto?.value === 'PORTOSANTOS'){
      newTrajetoOptions.push({ value: 'TRAJETOPORTOSANTOS', label: 'Trajeto Santos' });
    } else if (selectedPorto?.value === 'PORTOSAOSEBASTIAO'){
      newTrajetoOptions.push({ value: 'TRAJETOPORTOSAOSEBASTIAO', label: 'Trajeto São Sebastião' });
    }
    setTrajetoOptions(newTrajetoOptions);
  }, [selectedPorto]);

  useEffect(() => {
    setSelectedPorto(null);
    setSelectedTrajeto(null);
  }, [selectedState]);

  

  //MODAL COUNTER
  useEffect(() => {
    let intervalo;
    if(isOpenCheck && contador > 0){
      intervalo = setInterval(() => {
        setContador(contador - 1);
      }, 1000);
    } else if (contador === 0){
      setisOpenCheck(false);
      navigate('/homeuser');
    }
    return () => clearInterval(intervalo);
  }, [isOpenCheck, contador, navigate]);

  const formatarContador = (contador) => {
    if (contador < 60) {
      return `${contador} segundos...`;
    } else {
      const minutos = Math.floor(contador / 60);
      const segundosRestantes = contador % 60;
      return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
    }
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedDroneModel  === (null) || selectedState === (null)|| selectedPorto=== (null)|| selectedTrajeto === (null)) {
      console.log(selectedDroneModel, selectedState, selectedPorto, selectedTrajeto)
        setisOpenError(true);
        return;
    }

    try {
        const response = await axios.post('https://oceandrones-weabpp-java.azurewebsites.net/expedicaodrones/cadastrar', {
            drones: selectedDroneModel.value,
            ufExpedicao: selectedState.value,
            porto: selectedPorto.value,
            trajeto: selectedTrajeto.value
        });

        if (response.status === 200) {
            setisOpenCheck(true);
            console.log(response.status)
            setTimeout(() => {
            }, 2000);
        } else {
            setisOpenError(true);
        }
    } catch (error) {
        setisOpenError(true);
    }
};


  return (
    <>
      <HeaderHomeUser></HeaderHomeUser>
      
      <div className="w-[80vw] mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Solicitar expedição de drone:</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 pb-20">
          <label>
            1. Selecione o modelo do drone:
            <Select
              options={droneModels}
              value={selectedDroneModel}
              onChange={handleDroneModelChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>

          {selectedDroneImage &&
            <div className="w-full max-w-sm mx-auto my-4">
              <img src={selectedDroneImage} alt="Imagem do drone selecionado" className="w-full h-auto object-contain" />
            </div>
          }


          <label>
            2. Selecione o estado:
            <Select
              options={stateOption}
              value={selectedState}
              onChange={handleStateChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>

          <label>
            3. Selecione o porto disponível:
            <Select
              options={portoOptions}
              value={selectedPorto}
              onChange={handlePortoChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>

          <label>
            4. Selecione trajeto da expedição disponível:
            <Select
              options={trajetoOptions}
              value={selectedTrajeto}
              onChange={handleTrajetoChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>

          <button type="submit" className="bg-blue-500 text-white rounded p-2">Enviar requisição</button>
        </form>
      </div>


      {/* Modal de confirmação de cadastro */}
      {isOpenCheck && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Popup 
                open={isOpenCheck} 
                closeOnDocumentClick={false}
                onClose={() => setisOpenCheck(false)}
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
                          <h3 className="text-center text-lg font-bold text-gray-900 mt-4">Requisição cadastrada com sucesso!</h3>
                          <p className="text-center mt-4">Aguarde, a requisição está sendo gerada e<br>
                                                      </br>após a conclusão será enviado ao seu e-mail.<br>
                                                      </br>{formatarContador(contador)}...</p>
                      </div>
            </Popup>
          </div>
          )}

      {/* Modal de confirmação de cadastro */}
      {isOpenError && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Popup 
                open={isOpenError} 
                closeOnDocumentClick 
                onClose={() => setisOpenError(false)}
                contentStyle={{
                    width: '40%',
                    borderRadius: '20px',
                    padding: '20px',
                }}
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="bg-white rounded-lg p-5 fle">
                    <div className="bg-white rounded-lg p-5 flex flex-col items-center">
                        <div className="background bg-red-500 rounded-full h-16 w-16 flex items-center justify-center">
                          <FaTimes className='mx-auto'/>
                        </div>
                    </div>
                    <h3 className="text-center text-lg font-bold text-gray-900 mt-4">Por favor, preencha todos os campos.</h3>
                </div>
            </Popup>
          </div>
          )}


    </>
  );
};