import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import FormReservasC from "../fomularios/FormReservas";
import TabReservas from "../tabelas/TabReservas";
import { urlBackend } from "../assets/funcoes";
import Pagina from "../templates/Pagina";

export default function CadReservas() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [reserva, setReserva] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [reservaEdicao, setReservaEdicao] = useState({
    codigoR: "",
    periodoIn: "",
    periodoFin: "",
    quantidade: "",
    valor: "",
    codigoC:" ",
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
      .then((data) => {
        if (Array.isArray(data)) {
          setReserva(data);
        }
      })
      .catch((error) => {
        window.alert("Erro ao buscar as reservas: " + error.message);
      });
  }

  useEffect(() => {
    buscarReservas();
  }, []);
  useEffect(() => {
    console.log("Reservas Atualizadas: ", reserva);

  }, [reserva]);

  return (
    <Pagina>
      <Container>
        <Alert variant="secondary">Cadastro de Reservas</Alert>
        {exibirTabela ? (
          <TabReservas
            listaReservas={reserva}
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
