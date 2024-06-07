import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import HeaderHomeUser from '../headerHomeUser/headerHomeUser';

export default function ExpeditionRequest () {

  const droneModels = [
    { value: 'Ibubble - Capacidade mergulho 60m, sem fio, controle remoto, bateria 1h, dimensões 60cm x 45cm 35cm',
      label: 'Ibubble - Capacidade mergulho 60m, sem fio, controle remoto, bateria 1h, dimensões 60cm x 45cm 35cm',
      img : '/imgs/ibubble_drone.png'},

    { value: 'DTG3 Rov - Capacidade mergulho 200m, com fio, bateria 12h',
      label: 'DTG3 Rov - Capacidade mergulho 200m, com fio, bateria 12h',
      img : '/imgs/dtg3rov_drone.png'},

    { value: 'Gladius Mini - Capacidade mergulho 100m, sem fio, controle remoto, bateria 2h, dimensões 385 x 226 x 138mm',
      label: 'Gladius Mini - Capacidade mergulho 100m, sem fio, controle remoto, bateria 2h, dimensões 385 x 226 x 138mm',
      img : '/imgs/gladius_mini.png'},

    { value: 'PowerRay - Capacidade mergulho 30m, com fio, controle remoto, bateria 4h, dimensões 465 x 270 x 126mm',
      label: 'PowerRay - Capacidade mergulho 30m, com fio, controle remoto, bateria 4h, dimensões 465 x 270 x 126mm',
      img : '/imgs/powerray_drone.png'},

    { value: 'Titan Geneinno - Capacidade mergulho 150m, com/sem fio, controle remoto, qualidade img 4k, dimensões 90 x 374 x 165',
      label: 'Titan Geneinno - Capacidade mergulho 150m, com/sem fio, controle remoto, qualidade img 4k, dimensões 90 x 374 x 165',
      img : '/imgs/titan_geneinno.png'},
  ];

  const stateOption = [
    { value: 'AM - Amazonas', label: 'AM - Amazonas' },
    { value: 'PR - Paraná', label: 'PR - Paraná' },
    { value: 'PE - Pernambuco', label: 'PE - Pernambuco' },
    { value: 'RJ - Rio de Janeiro', label: 'RJ - Rio de Janeiro' },
    { value: 'RS - Rio Grande do Sul', label: 'RS - Rio Grande do Sul' },
    { value: 'SC - Santa Catarina', label: 'SC - Santa Catarina' },
    { value: 'SP - São Paulo', label: 'SP - São Paulo' },
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


  useEffect(() => {
    let newPortoOptions = [];
  
    if (selectedState?.value === 'AM - Amazonas') {
      newPortoOptions.push({ value: 'Porto Chibatão', label: 'Porto Chibatão' });
    } else if (selectedState?.value === 'PR - Paraná') {
      newPortoOptions.push({ value: 'Porto de Paranaguá', label: 'Porto de Paranaguá' });
    } else if (selectedState?.value === 'PE - Pernambuco') {
      newPortoOptions.push({ value: 'Porto de Suape', label: 'Porto de Suape' });
    } else if (selectedState?.value === 'RJ - Rio de Janeiro') {
      newPortoOptions.push({ value: 'Porto do Rio de Janeiro', label: 'Porto do Rio de Janeiro' });
    } else if (selectedState?.value === 'RS - Rio Grande do Sul') {
      newPortoOptions.push({ value: 'Porto de Rio Grande', label: 'Porto de Rio Grande' });
    } else if (selectedState?.value === 'SC - Santa Catarina') {
      newPortoOptions.push({ value: 'Porto de Itapoá', label: 'Porto de Itapoá' });
      newPortoOptions.push({ value: 'Portonave', label: 'Portonave' });
    } else if (selectedState?.value === 'SP - São Paulo') {
      newPortoOptions.push({ value: 'Porto de Santos', label: 'Porto de Santos' });
      newPortoOptions.push({ value: 'Porto de São Sebastião', label: 'Porto de São Sebastião' });
    }
    setPortoOptions(newPortoOptions);
  }, [selectedState]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode lidar com o envio do formulário
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


    </>
  );
};