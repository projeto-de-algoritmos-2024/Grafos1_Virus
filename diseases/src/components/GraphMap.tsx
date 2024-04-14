import { ForceGraph3D } from "react-force-graph";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { useCallback, useEffect, useState } from "react";
import { Graph, Pessoa } from "../types/GraphTypes";
import { useGraph } from "../contexts/GraphContext";

export function GraphMap() {
  const {
    graphData,
    setStartingNode,
    setEndingNode,
    startingNode,
    endingNode,
  } = useGraph();

  const extraRenderers = [new CSS2DRenderer() as any];
  const [pessoas, setPessoas] = useState<Graph>(graphData);

  function getAdjacentNodes(
    adjacencyList: Record<
      number,
      {
        outgoing: { target: number; value: number }[];
        incoming: { source: number; value: number }[];
      }
    >,
    targetNodeId: number
  ): number[] {
    const adjacentNodes = new Set<number>();

    adjacencyList[targetNodeId].outgoing.forEach((connection) => {
      adjacentNodes.add(connection.target);
    });

    adjacencyList[targetNodeId].incoming.forEach((connection) => {
      adjacentNodes.add(connection.source);
    });

    return Array.from(adjacentNodes);
  }

  const updateGraph = (nodes: Pessoa[]) => {
    const newNodes = [...nodes];

    newNodes.forEach((n) => {
      n.fx = n.x;
      n.fy = n.y;
      n.fz = n.z;
    });

    setPessoas((prevPessoas) => ({
      ...prevPessoas,
      nodes: newNodes,
    }));
  };

  const BFS = (nodeId: number) => {
    const queue = [nodeId];
    const newNodes = [...pessoas.nodes];
    newNodes[nodeId].isInfected = true;

    updateGraph(newNodes);

    const startInfection = () => {
      setTimeout(() => {
        processNode();
      }, 500);
    };

    const processNode = () => {
      if (queue.length === 0) {
        return;
      }

      const u = queue.shift();

      const adjNodes = getAdjacentNodes(pessoas.adjacencyList, u);
      let index = 0;

      const infectNode = () => {
        if (index < adjNodes.length) {
          const v = adjNodes[index];
          if (!newNodes[v].isInfected) {
            newNodes[v].isInfected = true;
            queue.push(v);

            updateGraph(newNodes);

            index++;
            setTimeout(infectNode, 500);
          } else {
            index++;
            infectNode();
          }
        } else {
          setTimeout(processNode, 50);
        }
      };

      infectNode();
    };

    startInfection();
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const DFS_VISIT = async (node: Pessoa, newNodes: Pessoa[]) => {
    node.isInfected = true;
    updateGraph(newNodes);

    const adjNodes = getAdjacentNodes(pessoas.adjacencyList, node.id);

    for (const v of adjNodes) {
      if (!newNodes[v].isInfected) {
        await delay(1000); // Aguarda um segundo antes de infectar o próximo nó
        await DFS_VISIT(newNodes[v], newNodes);
      }
    }
  };

  const DFS = async (nodeId: number) => {
    const newNodes = [...pessoas.nodes];
    const adjNodes = getAdjacentNodes(pessoas.adjacencyList, nodeId);
    if (!newNodes[nodeId].isInfected) {
      newNodes[nodeId].isInfected = true;
    }

    for (const v of adjNodes) {
      if (!newNodes[v].isInfected) {
        await DFS_VISIT(newNodes[v], newNodes);
        await delay(1000);
      }
    }
  };

  const handleClick = useCallback(
    (node: Pessoa) => {
      DFS(node.id);
    },
    [pessoas]
  );

  const handleSelectNode = (node: Pessoa) => {
    if (!startingNode) {
      setStartingNode(node);
    } else if (!endingNode) {
      setEndingNode(node);
    } else {
      setStartingNode(node);
      setEndingNode(null);
    }
  };

  useEffect(() => {
    setPessoas(graphData);
  }, [graphData]);

  return (
    <ForceGraph3D
      graphData={pessoas}
      // onNodeClick={handleClick} descomentar para rodar BFS
      onNodeClick={handleClick}
      nodeVal={15}
      nodeColor={(node) => {
        if (startingNode && node.id === startingNode.id) {
          return "#FFCA80";
        } else if (endingNode && node.id === endingNode.id) {
          return "#FFCA80";
        } else if (node.isInfected) {
          return "#FF9580";
        } else {
          return "#80FFEA";
        }
      }}
      nodeLabel={(node) => `[${node.id}] ${node.name}`}
      nodeOpacity={0.9}
      nodeThreeObject={(node) => {
        const nodeEl = document.createElement("div");
        nodeEl.textContent = `[${node.id}] ${node.name}`;
        nodeEl.style.color = "#fff";
        nodeEl.style.fontSize = "12px";
        nodeEl.style.fontWeight = "600";
        nodeEl.className = "node-label";
        return new CSS2DObject(nodeEl);
      }}
      nodeThreeObjectExtend={true}
      extraRenderers={extraRenderers}
      backgroundColor="#22212C"
    />
  );
}
