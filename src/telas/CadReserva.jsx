import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import FormReservasC from "../fomularios/FormReservas";
import TabReservas from "../tabelas/TabReservas";
import { urlBackend } from "../assets/funcoes";
import Pagina from "../templates/Pagina";

export default function CadReservas() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [reservas, setReservas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [reservaEdicao, setReservaEdicao] = useState({
    codigoR: "",
    cliente: "",
    periodoIn: "",
    periodoFin: "",
    quantidade: "",
    valor: "",
  });

  function prepararTela(reserva) {
    setModoEdicao(true);
    setReservaEdicao(reserva);
    setExibirTabela(false);
  }

  function deletarReserva(reserva) {
    fetch(urlBackend + "/reservasC", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserva),
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        window.alert(data.mensagem);
        buscarReservas();
      })
      .catch((error) => {
        window.alert("Erro ao excluir a reserva: " + error.message);
      });
  }

  function buscarReservas() {
    fetch(urlBackend + "/reservasC", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setReservas(dados);
        }
      })
      .catch((error) => {
        window.alert("Erro ao buscar as reservas: " + error.message);
      });
  }

  useEffect(() => {
    buscarReservas();
  }, []);

  return (
    <Pagina>
      <Container>
        <Alert variant="secondary">Cadastro de Reservas</Alert>
        {exibirTabela ? (
          <TabReservas
            listaReservas={reservas}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarReserva}
          />
        ) : (
          <FormReservasC
            reserva={reservaEdicao}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            buscarReservas={buscarReservas}
            exibirTabela={setExibirTabela}
          />
        )}
      </Container>
    </Pagina>
  );
}
