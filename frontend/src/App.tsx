import React, { useEffect, useState } from "react";
import { fetchMST } from "./api";
import Graph from "./components/Graph";

function App() {
  const [graphData, setGraphData] = useState<any>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    fetchMST().then((data) => {
      const nodes = new Set<string>();
      const links = data.connections.map((edge: any) => {
        nodes.add(edge.from);
        nodes.add(edge.to);
        return {
          source: edge.from,
          target: edge.to,
          weight: edge.weight,
        };
      });

      setGraphData({
        nodes: Array.from(nodes).map((id) => ({ id })),
        links,
      });
      setTotalCost(data.totalCost);
    });
  }, []);

  return (
    <div>
      <h1>🐈‍⬛ Feline Conspiracy Network</h1>
      <p>🔺 Custo total da rede secreta: {totalCost}</p>
      {graphData && <Graph data={graphData} />}
    </div>
  );
}

export default App;
