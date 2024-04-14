import { useState } from 'react';
import { useGraph } from '../contexts/GraphContext';

interface IModelProps {
  hasSelectedInfection: boolean;
  setHasSelectedInfection: (value: boolean) => void;
}

export function Modal({
  hasSelectedInfection,
  setHasSelectedInfection,
}: IModelProps) {
  const { getGraphData } = useGraph();
  const [components, setComponents] = useState(10);
  const [maxConnectionFactor, setMaxConnectionFactor] = useState(5);
  const [isolatedFactor, setIsolatedFactor] = useState(0.5);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function handleClick() {
    if (isButtonDisabled) return;

    if (components < 1) {
      alert('Número de pessoas deve ser um inteiro maior que 0');
      return;
    }

    if (maxConnectionFactor < 1) {
      alert('Fator de conexões máximas deve ser um inteiro maior que 0');
      return;
    }

    if (maxConnectionFactor > components - 1) {
      alert('Fator de conexões máximas deve ser menor que o número de pessoas');
      return;
    }

    if (isolatedFactor < 0 || isolatedFactor > 1) {
      alert('Fator de isolamento deve ser um número entre 0 e 1');
      return;
    }

    setIsButtonDisabled(true);
    getGraphData(components, maxConnectionFactor, isolatedFactor);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 0);
  }

  return (
    <div className="w-[250px] bg-stone-800 absolute top-4 left-4 z-[1000] rounded-lg p-4 text-white border-violet-900 border-2">
      <h1 className="text-2xl font-semibold">Diseases</h1>
      <div className="mt-4 flex flex-col gap-2">
        <h1>Pessoas</h1>
        <input
          className="w-full p-2 rounded-lg bg-stone-700 focus:outline-none"
          placeholder="Número de pessoas"
          onChange={(e) => {
            setComponents(Number(e.target.value));
          }}
          value={components}
        />
        <h1>Fator de Conexões Máximas</h1>
        <input
          className="w-full p-2 rounded-lg bg-stone-700 focus:outline-none"
          placeholder="Número máximo de conexões"
          onChange={(e) => {
            setMaxConnectionFactor(Number(e.target.value));
          }}
          value={maxConnectionFactor}
        />
        <h1>Fator de Isolamento</h1>
        <input
          className="w-full p-2 rounded-lg bg-stone-700 focus:outline-none"
          placeholder="Probabilidade de isolamento"
          onChange={(e) => {
            setIsolatedFactor(e.target.value as any);
          }}
          value={isolatedFactor}
        />
        <button
          className="bg-stone-900 text-white p-2 rounded-lg mt-2 hover:bg-white hover:text-stone-900 transition-colors font-semibold disabled:bg-stone-700 disabled:text-stone-900 disabled:cursor-not-allowed"
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          Gerar Grafo
        </button>
        <button
          className="bg-stone-900 text-white p-2 rounded-lg mt-2 hover:bg-white hover:text-stone-900 transition-colors font-semibold"
          onClick={() => setHasSelectedInfection(true)}
        >
          Infectar
        </button>
      </div>
    </div>
  );
}
