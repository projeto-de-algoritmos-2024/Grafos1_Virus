import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { ForceGraph3D } from "react-force-graph";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";

import { genRandomSeeds, getRandomAdjacencyList } from "../utils/seed";
import { Graph, Link, Pessoa } from "../types/GraphTypes";

interface IGraphMapProps {
  isAddingPerson: boolean;
  setIsAddingPerson: (isAddingPerson: boolean) => void;
  personName: string;
  setPersonName: (personName: string) => void;
}

export function GraphMap({}: IGraphMapProps) {
  const pessoasSeed = getRandomAdjacencyList();
  const extraRenderers = [new CSS2DRenderer() as any];
  const fgRef = useRef();

  const [pessoas, setPessoas] = useState<Graph>(pessoasSeed);
  // console.log(adjacencyList);

  // function ADJ(node: Pessoa) {
  //   return [];
  // }

  // function BFS() {
  //   const { nodes, links } = pessoas;

  //   const queue: Pessoa[] = [];
  //   const notVisited = nodes.filter((s) => !s.isInfected);

  //   // for every vertex s of G not explored (infected) yet
  //   notVisited.forEach((s) => {
  //     // do Enqueue(queue, s)
  //     queue.push(s);

  //     // mark S (queue) as visited (infected)
  //     nodes[s.id].isInfected = true;
  //     notVisited.splice(notVisited.indexOf(s), 1);

  //     // while S (queue) is not empty
  //     while (queue.length > 0) {
  //       // u <- Dequeue(queue)
  //       const u = queue.shift();

  //       // For each v in Adj[u] then
  //       const adj = ADJ(u);

  //       adj.forEach((v) => {
  //         // if v is not visited (infected) then
  //         if (!nodes[v].isInfected) {
  //           // do Enqueue(queue, v)
  //           queue.push(v);

  //           // mark v as visited (infected)
  //           nodes[v].isInfected = true;
  //           notVisited.splice(notVisited.indexOf(v), 1);
  //         }
  //       });
  //     }
  //   });
  // }

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
        n.fx = n.x;
        n.fy = n.y;
        n.fz = n.z;
      });

      setPessoas({ nodes: newNodes, links: links });
      BFS();
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

  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     BSF();
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <ForceGraph3D
      ref={fgRef}
      enableNodeDrag={false}
      // onNodeClick={(node) => (isAddingPerson ? addPerson(node) : handleClick)}z
      onNodeClick={handleClick}
      graphData={pessoas}
      linkWidth={1.5}
      nodeVal={(node) => (node.isInfected ? 10 : 5)}
      nodeColor={(node) => (node.isInfected ? "red" : "#63affb")}
      backgroundColor="#000"
      linkColor={(link: any) => {
        return link.source.isInfected && link.target.isInfected
          ? "red"
          : "#fff";
      }}
      nodeLabel={(node) => `${node.name} - ${node.id}`}
      nodeOpacity={0.9}
      nodeThreeObject={(node) => {
        const nodeEl = document.createElement("div");
        nodeEl.textContent = `${node.name} - ${node.id}`;
        nodeEl.style.color = "#fff";
        nodeEl.style.fontSize = "16px";
        nodeEl.style.fontWeight = "600";
        nodeEl.className = "node-label";
        return new CSS2DObject(nodeEl);
      }}
      nodeThreeObjectExtend={true}
      extraRenderers={extraRenderers}
    />
  );
}
