import React from "react";
import ForceGraph2D from "react-force-graph-2d";

interface GraphProps {
  data: {
    nodes: { id: string }[];
    links: { source: string; target: string; weight: number }[];
  };
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel="id"
      linkLabel="weight"
      nodeAutoColorBy="id"
      linkDirectionalParticles={2}
      linkDirectionalArrowLength={6}
    />
  );
};

export default Graph;
