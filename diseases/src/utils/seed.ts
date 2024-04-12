import { Graph } from "../types/GraphTypes";

const names = [
  "Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gabriel", "Helena",
  "Igor", "Julia", "Kauê", "Larissa", "Marcelo", "Natalia", "Otávio", "Patrícia",
  "Quentin", "Rafaela", "Samuel", "Tatiane", "Umberto", "Viviane", "Wagner", "Xuxa",
  "Yasmin", "Zacarias"
];

export function genRandomSeeds({ N = 100, maxConnectionFactor = 5, isolatedFactor = 0.5 } = {}): Graph {
  const nodes = [...Array(N).keys()].map(id => ({
    id,
    name: names[Math.floor(Math.random() * names.length)],
    val: Math.round(Math.random() * 10),
    isInfected: false,
    group: Math.floor(Math.random() * (1 / isolatedFactor)) // Atribui grupos aleatórios, alguns nós terão o mesmo grupo
  }));

  // Calcula o tamanho de cada grupo
  const groupSizes = nodes.reduce((acc, node) => {
    acc[node.group] = (acc[node.group] || 0) + 1;
    return acc;
  }, {});

  const links = nodes.flatMap(node => {
    // Ajusta o connectionFactor com base no tamanho do grupo
    const groupSize = groupSizes[node.group];
    const connectionFactor = Math.max(1, Math.round(maxConnectionFactor * (N / groupSize) / N));

    // Cria links apenas com nós do mesmo grupo
    const groupNodes = nodes.filter(n => n.group === node.group);
    return [...Array(connectionFactor).keys()].map(() => {
      const target = groupNodes[Math.floor(Math.random() * groupNodes.length)].id;
      return {
        source: node.id,
        target: target,
        value: Math.round(Math.random() * 10)
      };
    });
  });

  return { nodes, links };
}

export function getRandomAdjacencyList({ N = 100, maxConnectionFactor = 5, isolatedFactor = 0.5 } = {}): Graph {
  const nodes = [...Array(N).keys()].map(id => ({
    id,
    name: names[Math.floor(Math.random() * names.length)],
    val: Math.round(Math.random() * 10),
    isInfected: false,
    group: Math.floor(Math.random() * (1 / isolatedFactor))
  }));

  const groupSizes = nodes.reduce((acc, node) => {
    acc[node.group] = (acc[node.group] || 0) + 1;
    return acc;
  }, {});

  const links = nodes.flatMap(node => {
    const groupSize = groupSizes[node.group];
    const connectionFactor = Math.max(1, Math.round(maxConnectionFactor * (N / groupSize) / N));
    const groupNodes = nodes.filter(n => n.group === node.group);
    return [...Array(connectionFactor).keys()].map(() => {
      const target = groupNodes[Math.floor(Math.random() * groupNodes.length)].id;
      return {
        source: node.id,
        target: target,
        value: Math.round(Math.random() * 10)
      };
    });
  });

  const adjacencyList = nodes.reduce((acc, node) => {
    acc[node.id] = { outgoing: [], incoming: [] };
    return acc;
  }, {});

  links.forEach(link => {
    adjacencyList[link.source].outgoing.push({ target: link.target, value: link.value });
    adjacencyList[link.target].incoming.push({ source: link.source, value: link.value });
  });

  return { nodes, adjacencyList, links };
}