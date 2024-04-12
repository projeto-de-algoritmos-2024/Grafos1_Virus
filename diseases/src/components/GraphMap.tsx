import { ForceGraph3D } from "react-force-graph";
import { getRandomAdjacencyList } from "../utils/seed";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { useCallback } from "react";
import { Graph, Pessoa } from "../types/GraphTypes";
import { useState } from "react";

export function GraphMap() {
  const pessoasSeed = getRandomAdjacencyList();
  const extraRenderers = [new CSS2DRenderer() as any];
  const [pessoas, setPessoas] = useState<Graph>(pessoasSeed);

  function getAdjacentNodes(
    adjacencyList: Record<number, { target: number; value: number }[]>,
    targetNodeId: number
  ): number[] {
    const adjacentNodes: number[] = [];
    for (const [nodeId, connections] of Object.entries(adjacencyList)) {
      const hasTarget = connections.some(
        (connection) => connection.target === targetNodeId
      );
      if (hasTarget) {
        adjacentNodes.push(parseInt(nodeId));
      }

      if (parseInt(nodeId) === targetNodeId) {
        connections.forEach((connection) => {
          adjacentNodes.push(connection.target);
        });
      }
    }
    return adjacentNodes;
  }

  function BFS(nodeId: number) {
    let queue: number[] = [nodeId];
    let newNodes = [...pessoas.nodes];
    newNodes[nodeId].isInfected = true;

    const visitNode = () => {
      if (queue.length === 0) {
        return;
      }

      const current = queue.shift();
      const adjNodes = getAdjacentNodes(
        pessoas.adjacencyList,
        current as number
      );

      adjNodes.forEach((adjNodeId) => {
        if (!newNodes[adjNodeId].isInfected) {
          newNodes[adjNodeId].isInfected = true;
          queue.push(adjNodeId);
        }
      });

      newNodes.forEach((n) => {
        n.fx = n.x;
        n.fy = n.y;
        n.fz = n.z;
      });

      setPessoas((prevPessoas) => ({
        ...prevPessoas,
        nodes: newNodes,
      }));

      setTimeout(visitNode, 1000); // Delay the next visit by 1 second
    };

    visitNode();
  }

  const handleClick = useCallback(
    (node: Pessoa) => {
      BFS(node.id);
    },
    [pessoas]
  );

  return (
    <ForceGraph3D
      graphData={pessoas}
      onNodeClick={handleClick}
      nodeVal={15}
      nodeColor={(node) => (node.isInfected ? "red" : "blue")}
      nodeLabel={(node) => `${node.name} - ${node.id}`}
      nodeOpacity={0.9}
      nodeThreeObject={(node) => {
        const nodeEl = document.createElement("div");
        nodeEl.textContent = `${node.name} - ${node.id}`;
        nodeEl.style.color = "#fff";
        nodeEl.style.fontSize = "12px";
        nodeEl.style.fontWeight = "600";
        nodeEl.className = "node-label";
        return new CSS2DObject(nodeEl);
      }}
      nodeThreeObjectExtend={true}
      extraRenderers={extraRenderers}
    />
  );
}
