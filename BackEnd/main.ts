import express from "express";
import path from "path";
import { kruskal } from "./kruskal";
import { catNames, edges } from "./data";

const app = express();
const PORT = 4000;

// Caminho para os arquivos buildados do React
const frontendPath = path.join(__dirname, "../client");
app.use(express.static(frontendPath));

// Rota da API
app.get("/mst", (req, res) => {
  const mst = kruskal(catNames.length, edges);
  const result = {
    connections: mst.map(edge => ({
      from: catNames[edge.from],
      to: catNames[edge.to],
      weight: edge.weight
    })),
    totalCost: mst.reduce((acc, e) => acc + e.weight, 0)
  };
  res.json(result);
});

// Rota fallback para React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🐈‍⬛ Servindo app em http://localhost:${PORT}`);
});
