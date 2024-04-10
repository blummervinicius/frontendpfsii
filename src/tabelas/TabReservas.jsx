import { useState } from "react";
import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";
import FormReservasC from "../fomularios/FormReservas";


export default function TabReservas(props) {
  const [reservas] = useState(props.listaReservas);
  const [exibirFormCadastro, setExibirFormCadastro] = useState(false);
  

  async function editarReserva(codigoR) {
    try {
      const response = await fetch(urlBackend + "/reservasC/" + codigoR);
      const data = await response.json();
      props.editar(data); 
      setExibirFormCadastro(true); 
    } catch (error) {
      console.error("Erro ao buscar detalhes da reserva:", error);
    }
  }

  async function excluirReserva(codigoR) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta reserva?"
    );
    if (confirmacao) {
      try {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ res_codigoR: codigoR }),
        };
        const response = await fetch(urlBackend + "/reservasC", requestOptions);
        const data = await response.json();
        if (data.status) {
          props.buscarReservas(); 
        }
        window.alert(data.mensagem);
      } catch (error) {
        console.error("Erro ao excluir reserva:", error);
        window.alert("Erro ao excluir reserva: " + error.message);
      }
    }
  }

  function abrirFormCadastro() {
    setExibirFormCadastro(true);
  }

  function filtrarReservas(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/reservasC", { method: "GET" })
      .then((resposta) => {return resposta.json()})
      .then((listaReserva) => {
        if (Array.isArray(listaReserva)) {
          const resultadoBusca = listaReserva.filter(
                (reserva) =>
                reserva.codigoR.toLowerCase().includes(termoBusca.toLowerCase())
          );
                  
             props.setReservas(resultadoBusca);
            }
          });
            
      
  }
  

  // function filtrarReservas(e) {
  //   const termoBusca = e.currentTarget.value;
  //   fetch(urlBackend + "/reservasC", { method: "GET" })
  //     .then((resposta) => resposta.json())
  //     .then((listaReservas) => {
  //       if (Array.isArray(listaReservas)) {
  //         const resultadoBusca = listaReservas.filter((reserva) =>
  //           reserva.cliente.nome.toLowerCase().includes(termoBusca.toLowerCase())
  //         );
  //         setReservas(resultadoBusca);
  //       }
  //     });
  // }

  return (
    <Container>
      <Button variant="primary" onClick={abrirFormCadastro}>
        Cadastrar Nova Reserva
      </Button>
      {exibirFormCadastro ? (
        <FormReservasC
          reserva={props.reserva}
          modoEdicao={props.modoEdicao}
          setModoEdicao={props.setModoEdicao}
          buscarReservas={props.buscarReservas}
          exibirTabela={() => setExibirFormCadastro(false)}
        />
      ) : (
        <div>
          <InputGroup className="mt-2">
            <FormControl
              type="text"
              id="termoBusca"
              placeholder="Buscar reserva por cliente"
              onChange={filtrarReservas}
            />
            <InputGroup.Text>
              <RiSearchLine />
            </InputGroup.Text>
          </InputGroup>
        </div>
      )}

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th className="text-center">Código Reserva</th>
            <th className="text-center">Período Inicial</th>
            <th className="text-center">Período Final</th>
            <th className="text-center">Quantidade</th>
            <th className="text-center">Valor</th>
            <th className="text-center">Cliente</th>
            <th className="text-center">Cliente/Código</th>
            <th className="text-center">Cliente/Nome</th>
            <th className="text-center">Cliente/CPF</th>
            <th className="text-center">Cliente/Telefone</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.codigoR}>
              <td>{reserva.codigoR}</td>
              <td>{reserva.periodoIn}</td>
              <td>{reserva.periodoFin}</td>
              <td>{reserva.quantidade}</td>
              <td>{reserva.valor}</td>
              <td>{reserva.cliente.codigoC}</td>
              <td>{reserva.cliente.nome}</td>
              <td>{reserva.cliente.cpf}</td>
              <td>{reserva.cliente.telefone}</td>
             
              <td className="text-center">
                <Button
                  variant="outline-primary"
                  onClick={() => editarReserva(reserva.codigoR)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => excluirReserva(reserva.codigoR)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
