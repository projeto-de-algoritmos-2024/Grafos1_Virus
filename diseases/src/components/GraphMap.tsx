import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/addons/renderers/CSS2DRenderer.js';

import { genRandomSeeds } from '../utils/seed';
import { Graph, Link, Pessoa } from '../types/GraphTypes';

interface IGraphMapProps {
  isAddingPerson: boolean;
  setIsAddingPerson: (isAddingPerson: boolean) => void;
  personName: string;
  setPersonName: (personName: string) => void;
}

export function GraphMap({}: IGraphMapProps) {
  const pessoasSeed = genRandomSeeds();
  const extraRenderers = [new CSS2DRenderer() as any];
  const fgRef = useRef();

  const [pessoas, setPessoas] = useState<Graph>(pessoasSeed);

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

  // useEffect(() => {
  //   setInterval(() => {
  //     const { nodes, links } = pessoas;
  //     const infectedNodes = nodes.filter((n) => n.isInfected);

  //     links.map((l) => {
  //       const source = l.source.id;
  //       const target = l.target.id;

  //       if (infectedNodes.some((n) => n.id === source)) {
  //         nodes[target].isInfected = true;
  //       }

  //       return l;
  //     });

  //     setPessoas({ nodes: nodes, links: links });
  //   }, 3000);
  // }, []);
  return (
    <ForceGraph3D
      ref={fgRef}
      enableNodeDrag={false}
      // onNodeClick={(node) => (isAddingPerson ? addPerson(node) : handleClick)}
      onNodeClick={handleClick}
      graphData={pessoas}
      linkWidth={1.5}
      nodeVal={(node) => (node.isInfected ? 10 : 5)}
      nodeColor={(node) => (node.isInfected ? 'red' : '#63affb')}
      backgroundColor="#fafafa"
      linkColor={(link: any) => {
        return link.source.isInfected && link.target.isInfected
          ? 'red'
          : '#333';
      }}
      nodeLabel={(node) => node.name}
      nodeOpacity={0.9}
      nodeThreeObject={(node) => {
        const nodeEl = document.createElement('div');
        nodeEl.textContent = node.name;
        nodeEl.style.color = '#333';
        nodeEl.style.fontSize = '8px';
        nodeEl.style.fontWeight = '600';
        nodeEl.className = 'node-label';
        return new CSS2DObject(nodeEl);
      }}
      nodeThreeObjectExtend={true}
      extraRenderers={extraRenderers}
    />
  );
}
