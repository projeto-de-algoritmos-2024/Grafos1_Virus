import './App.css';
import { Modal } from './components/Modal';
import { GraphMap } from './components/GraphMap';
import { useState } from 'react';

function App() {
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [personName, setPersonName] = useState('');

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* <Modal
        isAddingPerson={isAddingPerson}
        setIsAddingPerson={setIsAddingPerson}
        personName={personName}
        setPersonName={setPersonName}
      /> */}
      <GraphMap />
    </div>
  );
}

export default App;
