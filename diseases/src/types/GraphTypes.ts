export interface Link {
  source: number;
  target: number;
}

export interface Pessoa {
  id: number;
  name: string;
  val: number;
  isInfected: boolean;
}
export interface Graph {
  nodes: Pessoa[];
  links: Link[];
}
