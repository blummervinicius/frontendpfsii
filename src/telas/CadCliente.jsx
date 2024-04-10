import Pagina from "../templates/Pagina";
import FormCliente from "../fomularios/FormCliente";
import TabelaCliente from "../tabelas/TabCliente";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadCliente() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [cliente, setCliente] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  // const [editCliente] = useState((false));

  useEffect(() => {
    fetchClientes();
  }, []);

  function fetchClientes() {
    fetch(urlBackend + "/cliente")
      .then((resposta) => resposta.json())
      .then((data) => {
        setCliente(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
      });
  }

  function handleEditar() {
    setModoEdicao(true);
    setExibirTabela(false);
  }

  function handleExcluir(cliente) {
    fetch(urlBackend + "/cliente", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    })
    .then((resposta) => resposta.json())
    .then((data) => {
      if (data.status) {
        fetchClientes(); // Atualiza a lista de clientes após a exclusão
      }
      window.alert(data.mensagem);
    })
    .catch((error) => {
      window.alert("Erro ao excluir cliente: " + error.message);
    });
  }


  // function preparaTela(cliente) {
  //   setModoEdicao(true);
  //   setEditCliente(cliente);
  //   setExibirTabela(false);
  // }

  // function excluirCliente(cliente) {
  //   fetch(urlBackend + "/cliente", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(cliente),
  //   }).then((resposta) => {
  //     window.alert("Cliente excluído com sucesso!");
  //     return resposta.json();
  //   });
  // }

  // useEffect(() => {
  //   fetch(urlBackend + "/cliente", {
  //     method: "GET",
  //   })
  //     .then((resposta) => {
  //       return resposta.json();
  //     })
  //     .then((dados) => {
  //       if (Array.isArray(dados)) {
  //         setCliente(dados);
  //       }
  //     });
  // }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Cliente</Alert>
        {exibirTabela ? (
          <TabelaCliente
            listaCliente={cliente}
            setCliente={setCliente}
            exibirTabela={setExibirTabela}
            editar={handleEditar}
            excluir={handleExcluir}
          />
        ) : (
          <FormCliente
            listaCliente={cliente}
            setCliente={setCliente}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
           
          />
        )}
      </Container>
    </Pagina>
  );
}
