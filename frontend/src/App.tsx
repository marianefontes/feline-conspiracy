import React, { useEffect, useState } from "react";
import { fetchMST } from "./api";
import Graph from "./components/Graph";
import "./index.css";

function App() {
  const [graphData, setGraphData] = useState<any>(null);
  const [linkAnimados, setLinkAnimados] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [gatoInicial, setGatoInicial] = useState<string>("");
  const [gatosDisponiveis, setGatosDisponiveis] = useState<string[]>([]);

  const carregarGrafo = (gatoBase: string = "") => {
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

      const allNodes = Array.from(nodes);
      setGatosDisponiveis(allNodes);

      const gatoDefault = gatoBase || allNodes[0] || "";
      setGatoInicial(gatoDefault);

      const nodesComImagem = allNodes.map((id, index) => ({
        id,
        img: `/images/${(index % 10) + 1}.png`, // imagens de 1.png até 10.png
        isInicial: id === gatoDefault,
      }));

      setGraphData({
        nodes: nodesComImagem,
        links: [],
      });

      setTotalCost(data.totalCost);
      animarLinks(links, gatoDefault);
    });
  };

  const animarLinks = (todosLinks: any[], gatoBase: string) => {
    const ordenados = [...todosLinks].filter(
      (l) => l.source && l.target && l.weight !== undefined
    );

    if (gatoBase) {
      ordenados.sort((a, b) => {
        const aTem = a.source === gatoBase || a.target === gatoBase;
        const bTem = b.source === gatoBase || b.target === gatoBase;
        return Number(bTem) - Number(aTem);
      });
    }

    let i = 0;
    setLinkAnimados([]);

    const interval = setInterval(() => {
      if (i >= ordenados.length) {
        clearInterval(interval);
        return;
      }

      const link = ordenados[i];
      if (link.source && link.target) {
        setLinkAnimados((prev) => [...prev, link]);
      }

      i++;
    }, 700);
  };

  useEffect(() => {
    carregarGrafo();
  }, []);

  // const alternarModo = () => {
  //   document.body.classList.toggle("dark");
  // };

  const formatarNome = (id: string) => {
    return id
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .trim()
  };

  const nomeFormatado = gatoInicial ? formatarNome(gatoInicial) : "Nenhum";

  return (
    <div className="container">
      <div className="left-panel">
        <div className="top-actions">
          <select
            className="gato-select"
            value={gatoInicial}
            onChange={(e) => {
              const escolhido = e.target.value;
              setGatoInicial(escolhido);
              carregarGrafo(escolhido);
            }}
          >
            <option value="">Escolha um Gato</option>
            {gatosDisponiveis.map((id) => (
              <option key={id} value={id}>
                {formatarNome(id)}
              </option>
            ))}
          </select>

          {/* <span className="dark-toggle" onClick={alternarModo}>
            Modo Dark
          </span> */}
        </div>

        <div className="content">
          <h1 className="main-title">Feline Conspiracy</h1>
          <p className="subtitle">
            O mundo será dos gatos. Estamos apenas conectando as peças.
          </p>
          <p className="lider">
            👁️‍🗨️ Líder da Conspiração: <strong>{nomeFormatado}</strong>
          </p>
          <p className="cost">🔺 Custo Total da Rede Secreta: {totalCost}</p>
        </div>
      </div>

      <div className="right-panel">
        {graphData && (
          <Graph
            data={{
              nodes: graphData.nodes,
              links: linkAnimados,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
