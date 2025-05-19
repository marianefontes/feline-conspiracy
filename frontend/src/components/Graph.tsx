import React, { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

interface NodeType {
  id: string;
  img?: string;
  isInicial?: boolean;
  x?: number;
  y?: number;
}

interface GraphProps {
  data: {
    nodes: NodeType[];
    links: { source: string; target: string; weight: number }[];
  };
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});
  const graphRef = useRef<any>(null);

  // Carrega imagens dos gatos
  useEffect(() => {
    const imgMap: Record<string, HTMLImageElement> = {};
    data.nodes.forEach((node) => {
      if (node.img && !images[node.id]) {
        const img = new Image();
        img.src = node.img;
        img.onload = () => {
          setImages((prev) => ({ ...prev, [node.id]: img }));
        };
      }
    });
  }, [data.nodes]);

  // Zoom automático ao carregar links
  useEffect(() => {
    if (graphRef.current) {
      setTimeout(() => {
        graphRef.current.zoomToFit(400); // 400ms de animação
      }, 300);
    }
  }, [data.links]);

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={data}
      nodeLabel={(node: NodeType) => `Gato ${node.id}`}
      linkLabel="weight"
      nodeCanvasObject={(node: NodeType, ctx, globalScale) => {
        const size = 100 / globalScale;
        const img = images[node.id];
        const isInicial = node.isInicial;

        if (img && node.x !== undefined && node.y !== undefined) {
          ctx.save();

          if (isInicial) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, size / 2 + 5, 0, 2 * Math.PI);
            ctx.strokeStyle = "#d9c2a0";
            ctx.lineWidth = 2;
            ctx.shadowColor = "#d9c2a0";
            ctx.shadowBlur = 12;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = "#999";
          ctx.fill();
        }
      }}
      nodePointerAreaPaint={(node: NodeType, color, ctx) => {
        const size = 10;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, size, 0, 2 * Math.PI, false);
        ctx.fill();
      }}
      linkDirectionalParticles={2}
      linkDirectionalArrowLength={6}
    />
  );
};

export default Graph;
