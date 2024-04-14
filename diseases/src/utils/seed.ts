import { Graph } from "../types/GraphTypes";

const names = [
  "Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gabriel", "Helena",
  "Igor", "Julia", "Kauê", "Larissa", "Marcelo", "Natalia", "Otávio", "Patrícia",
  "Quentin", "Rafaela", "Samuel", "Tatiane", "Umberto", "Viviane", "Wagner", "Xuxa",
  "Yasmin", "Zacarias"
];

export function getRandomAdjacencyList({ N = 10, maxConnectionFactor = 5, isolatedFactor = 0.5 } = {}): Graph {
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

  const adjacencyList = nodes.reduce((acc, node) => {
    acc[node.id] = { outgoing: [], incoming: [] };
    return acc;
  }, {});

  nodes.forEach(node => {
    const groupNodes = nodes.filter(n => n.group === node.group && n.id !== node.id);
    if (groupNodes.length > 0) {
      const connectionFactor = Math.max(1, Math.round(maxConnectionFactor * (N / groupSizes[node.group]) / N));
      const uniqueTargets = new Set();

      while (uniqueTargets.size < connectionFactor) {
        const target = groupNodes[Math.floor(Math.random() * groupNodes.length)].id;
        if (node.id !== target && !uniqueTargets.has(target)) {
          uniqueTargets.add(target);
        }
      }

      uniqueTargets.forEach(target => {
        adjacencyList[node.id].outgoing.push({ target, value: Math.round(Math.random() * 10) });
        adjacencyList[target].incoming.push({ source: node.id, value: Math.round(Math.random() * 10) });
      });
    }
  });

  const links = nodes.flatMap(node => adjacencyList[node.id].outgoing.map(link => ({
    source: node.id,
    target: link.target,
    value: link.value
  })));
  console.log(links);


  return { nodes, adjacencyList, links };
}
