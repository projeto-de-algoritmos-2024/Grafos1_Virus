import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getRandomAdjacencyList } from '../utils/seed';
import { Graph } from '../types/GraphTypes';

interface GraphContextType {
  graphData: Graph;
  getGraphData: (
    N: number,
    maxConnectionFactor: number,
    isolatedFactor: number
  ) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [graphData, setGraphData] = useState<Graph>(getRandomAdjacencyList());

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
    <GraphContext.Provider value={{ graphData, getGraphData }}>
      {children}
    </GraphContext.Provider>
  );
};

export function useGraph(): GraphContextType {
  const context = useContext(GraphContext);

  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }

  const { graphData, getGraphData } = context;

  return { graphData, getGraphData };
}
