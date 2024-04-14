import { useState } from 'react';
import { useGraph } from '../contexts/GraphContext';
import { Pessoa } from '../types/GraphTypes';

interface IInfectionModalProps {
  hasSelectedInfection: boolean;
  setHasSelectedInfection: (value: boolean) => void;
}

export function InfectionModal({
  hasSelectedInfection,
  setHasSelectedInfection,
}: IInfectionModalProps) {
  const { setStartingNode, startingNode, setEndingNode, endingNode } =
    useGraph();

  const handleReturn = () => {
    setStartingNode(null);
    setEndingNode(null);
    setHasSelectedInfection(false);
  };

  return (
    <div className="w-[250px] bg-stone-800 absolute top-4 left-4 z-[1000] rounded-lg p-4 text-white border-violet-900 border-2">
      <h1 className="text-2xl font-semibold">Diseases</h1>
      <div className="mt-4 flex flex-col gap-2">
        <div className="p-2 bg-stone-700 rounded">
          <h1 className="">Clique na pessoa que começará a infecção</h1>
          <input
            type="text"
            disabled
            className="mt-2 rounded p-2"
            value={startingNode?.name}
          />
        </div>
        <div className="p-2 bg-stone-700 rounded">
          <h1 className="">Clique na pessoa que deseja matar</h1>
          <input
            type="text"
            disabled
            className="mt-2 rounded p-2"
            value={endingNode?.name}
          />
        </div>

        <button className="bg-stone-900 text-white p-2 rounded-lg mt-2 hover:bg-white hover:text-stone-900 transition-colors font-semibold">
          Infectar
        </button>
        <button
          className="bg-stone-900 text-white p-2 rounded-lg mt-2 hover:bg-white hover:text-stone-900 transition-colors font-semibold"
          onClick={handleReturn}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
