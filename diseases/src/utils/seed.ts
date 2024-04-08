import { Pessoa, Link } from "../types/GraphTypes";

export function genRandomSeeds(tamanho: number) {
  const pessoasSeed: Pessoa[] = [];
  const LinksSeed: Link[] = [];

  for (let i = 0; i < tamanho; i++) {
    const isInfected = false;
    const val = Math.floor(Math.random() * 10) + 1;
    pessoasSeed.push({ id: i, name: `Pessoa ${i}`, val, isInfected });
  }

  for (let i = 0; i < tamanho; i++) {
    const source = Math.floor(Math.random() * i);
    const target = Math.floor(Math.random() * tamanho);
    LinksSeed.push({ source, target });
  }

  return { pessoasSeed, LinksSeed };
}