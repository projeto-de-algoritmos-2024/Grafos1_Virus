import './App.css';
import { pessoasSeed, relacoes } from './utils/seed';
import { useState, useCallback } from 'react';
import { ForceGraph3D } from 'react-force-graph';

interface Pessoa {
  id: number;
  name: string;
  isInfected: boolean;
}

function App() {
  const [pessoas, setPessoas] = useState({
    nodes: pessoasSeed,
    links: relacoes,
  });

  const handleClick = useCallback(
    (node: Pessoa) => {
      const { nodes, links } = pessoas;

      const newNodes = nodes.slice().map((n) => {
        if (n.id === node.id) {
          n.isInfected = !n.isInfected;
        }

        return n;
      });

      newNodes.forEach((n, idx) => {
        n.id = idx;
      });

      setPessoas({ nodes: newNodes, links: links });
    },
    [pessoas, setPessoas]
  );

  return (
    <>
      <ForceGraph3D
        enableNodeDrag={false}
        onNodeClick={handleClick}
        graphData={pessoas}
        dagLevelDistance={50}
        nodeVal={(node) => (node.isInfected ? 10 : 5)}
        dagNodeFilter={(node) => !node.isInfected}
        nodeColor={(node) => (node.isInfected ? 'red' : '#A7C7E7')}
      />
    </>
  );
}

export default App;
