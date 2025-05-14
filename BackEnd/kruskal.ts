import { Edge } from "./data";

class UnionFind {
  parent: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;
    this.parent[rootY] = rootX;
    return true;
  }
}

export function kruskal(numNodes: number, edges: Edge[]): Edge[] {
  const result: Edge[] = [];
  const uf = new UnionFind(numNodes);
  const sorted = edges.sort((a, b) => a.weight - b.weight);

  for (const edge of sorted) {
    if (uf.union(edge.from, edge.to)) {
      result.push(edge);
    }
    if (result.length === numNodes - 1) break;
  }

  return result;
}
