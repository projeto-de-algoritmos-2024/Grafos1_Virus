interface IModalProps {
  isAddingPerson: boolean;
  setIsAddingPerson: (isAddingPerson: boolean) => void;
  personName: string;
  setPersonName: (personName: string) => void;
}

export function Modal({
  isAddingPerson,
  setIsAddingPerson,
  personName,
  setPersonName,
}: IModalProps) {
  function handleClick() {
    setIsAddingPerson(true);
  }

  return (
    <div className="h-[300px] w-[400px] bg-stone-800 absolute top-4 left-4 z-10 rounded-lg p-4 text-white">
      <h1 className="text-2xl font-semibold">Diseases</h1>
      <div className="mt-4 flex flex-col gap-2">
        <h1>Selecionar Pessoas</h1>
        <p>Nome</p>
        <input type="text" className="text-stone-800" />
        <button
          className="text-white bg-stone-900 rounded py-1"
          onClick={handleClick}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
