
import { Graph } from "../types/GraphTypes";

export function genRandomSeeds({ N = 200 } = {}): Graph {
  return {
    nodes: [...Array(N).keys()].map(id => ({
      id,
      name: `Pessoa ${id}`,
      val: Math.round(Math.random() * 10),
      isInfected: false
    })),
    links: [...Array(N).keys()].flatMap(id => {
      const target = Math.round(Math.random() * (N - 1));
      return [
        {
          source: id,
          target: target,
          value: Math.round(Math.random() * 10)
        },
        {
          source: target,
          target: id,
          value: Math.round(Math.random() * 10)
        }
      ];
    })
  };
}
