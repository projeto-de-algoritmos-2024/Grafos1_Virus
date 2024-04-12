import './App.css';
import { Modal } from './components/Modal';
import { GraphMap } from './components/GraphMap';
import { GraphProvider } from './contexts/GraphContext';

function App() {
  return (
    <GraphProvider>
      <div className="w-screen h-screen overflow-hidden">
        <Modal />
        <GraphMap />
      </div>
    </GraphProvider>
  );
}

export default App;
