import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getRandomAdjacencyList } from '../utils/seed';
import { Graph, Pessoa } from '../types/GraphTypes';

interface GraphContextType {
  graphData: Graph;
  getGraphData: (
    N: number,
    maxConnectionFactor: number,
    isolatedFactor: number
  ) => void;
  startingNode?: Pessoa;
  setStartingNode: (node: Pessoa | null) => void;
  endingNode?: Pessoa;
  setEndingNode: (node: Pessoa | null) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [graphData, setGraphData] = useState<Graph>(getRandomAdjacencyList());
  const [startingNode, setStartingNode] = useState<Pessoa | null>(null);
  const [endingNode, setEndingNode] = useState<Pessoa | null>(null);

  function getGraphData(
    N: number,
    maxConnectionFactor: number,
    isolatedFactor: number
  ) {
    setGraphData(
      getRandomAdjacencyList({ N, maxConnectionFactor, isolatedFactor })
    );
  }

  return (
    <GraphContext.Provider
      value={{
        graphData,
        getGraphData,
        startingNode,
        setStartingNode,
        endingNode,
        setEndingNode,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export function useGraph(): GraphContextType {
  const context = useContext(GraphContext);

  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }

  const {
    graphData,
    getGraphData,
    startingNode,
    setStartingNode,
    endingNode,
    setEndingNode,
  } = context;

  return {
    graphData,
    getGraphData,
    startingNode,
    setStartingNode,
    endingNode,
    setEndingNode,
  };
}
