import Pagina from "../templates/Pagina";
import FormCliente from "../fomularios/FormCliente";
import TabelaCliente from "../tabelas/TabCliente";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadCliente() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    telefone: "",
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editCliente, setEditCliente] = useState({
    nome: "",
    cpf: "",
    telefone: "",
  });

  function preparaTela(cliente) {
    setModoEdicao(true);
    setEditCliente(cliente);
    setExibirTabela(false);
  }

  function excluirCliente(cliente) {
    fetch(urlBackend + "/cliente", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    }).then((resposta) => {
      window.alert("Cliente excluído com sucesso!");
      return resposta.json();
    });
  }

  useEffect(() => {
    fetch(urlBackend + "/cliente", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCliente(dados);
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Cliente</Alert>
        {exibirTabela ? (
          <TabelaCliente
            listaCliente={cliente}
            setCliente={setCliente}
            exibirTabela={setExibirTabela}
            editar={preparaTela}
            excluir={excluirCliente}
          />
        ) : (
          <FormCliente
            listaCliente={cliente}
            setCliente={setCliente}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            editar={preparaTela}
            pessoa={editCliente}
          />
        )}
      </Container>
    </Pagina>
  );
}
