import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import FormVeiculo from "../fomularios/FormVeiculos";
import Pagina from "../templates/Pagina";
import TabVeiculos from "../tabelas/TabVeiculos";

export default function CadVeiculos() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [veiculo, setVeiculo] = useState([]);

  useEffect(() => {
    buscarVeiculos();
  }, []);

  const buscarVeiculos = () => {
    fetch(urlBackend + "/veiculo")
      .then((response) => response.json())
      .then((data) => {
        setVeiculo(data);
      })
      .catch((error) => console.error("Erro ao buscar veículos:", error));
  };

  return (
    <Pagina>
      <Container>
        {exibirTabela ? (
          <TabVeiculos listaVeiculos={veiculo} exibirTabela={setExibirTabela} />
        ) : (
          <FormVeiculo
            buscarVeiculos={buscarVeiculos}
            exibirTabela={setExibirTabela}
          />
        )}
      </Container>
    </Pagina>
  );
}
