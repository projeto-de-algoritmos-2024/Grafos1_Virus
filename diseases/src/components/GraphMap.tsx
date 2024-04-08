import { useState, useCallback, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { genRandomSeeds } from '../utils/seed';

import { Graph, Pessoa } from '../types/GraphTypes';

interface IGraphMapProps {
  isAddingPerson: boolean;
  setIsAddingPerson: (isAddingPerson: boolean) => void;
  personName: string;
  setPersonName: (personName: string) => void;
}

export function GraphMap({
  isAddingPerson,
  setIsAddingPerson,
  personName,
  setPersonName,
}: IGraphMapProps) {
  const pessoasSeed = genRandomSeeds(100);

  const [pessoas, setPessoas] = useState<Graph>({
    nodes: pessoasSeed.pessoasSeed,
    links: pessoasSeed.LinksSeed,
  });
  const [firstSelectedNode, setFirstSelectedNode] = useState<Pessoa | null>(
    null
  );
  const [secondSelectedNode, setSecondSelectedNode] = useState<Pessoa | null>(
    null
  );

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

  function getLastNode() {
    return pessoas.nodes[pessoas.nodes.length - 1];
  }

  function addPerson(person1?: Pessoa, person2?: Pessoa) {
    const { nodes, links } = pessoas;

    const newNodes = nodes.slice();
    const newLinks = links.slice();

    if (!person1 || !person2) {
      newNodes.push({
        id: newNodes.length,
        name: `Pessoa ${newNodes.length}`,
        val: getLastNode().val + 1,
        isInfected: false,
      });
    }

    newNodes.push({
      id: newNodes.length,
      name: `Pessoa ${newNodes.length}`,
      val: getLastNode().val + 1,
      isInfected: false,
    });

    newLinks.push({
      source: person1!.id,
      target: newNodes.length - 1,
    });

    newLinks.push({
      source: person2!.id,
      target: newNodes.length - 1,
    });

    setPessoas({ nodes: newNodes, links: newLinks });
  }

  useEffect(() => {
    setInterval(() => {
      setPessoas(({ nodes, links }) => {
        const newNodes = nodes.slice();
        const newLinks = links.slice();

        const infectedNodes = newNodes.filter((n) => n.isInfected);

        return { nodes: newNodes, links: newLinks };
      });
    }, 10000);
  }, []);

  return (
    <ForceGraph3D
      enableNodeDrag={false}
      // onNodeClick={(node) => (isAddingPerson ? addPerson(node) : handleClick)}
      onNodeClick={handleClick}
      graphData={pessoas}
      linkWidth={1.5}
      dagLevelDistance={50}
      nodeVal={(node) => (node.isInfected ? 10 : 5)}
      dagNodeFilter={(node) => !node.isInfected}
      nodeColor={(node) => (node.isInfected ? 'red' : '#A7C7E7')}
      backgroundColor="#141414"
      nodeLabel={(node) => node.name}
    />
  );
}
