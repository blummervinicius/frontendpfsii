import { useState } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import SeletorClientes from "./SeletorCliente";

export default function FormReservasC(props) {
  const [reserva, setReserva] = useState({
    codigoR:"",
    periodoIn:"",
    periodoFin:"",
    quantidade:"",
    valor:"",
    codigoC:"",
  });
  const [setData] = useState([])
  const [validated, setValidated] = useState(false);
  //const [clienteSelecionado, setClienteSelecionado] = useState(null);

  //const [cliente, setCliente] = useState([])

  function handleChange(e) {
    const { id, value } = e.target;
    setReserva({ ...reserva, [id]: value });
  }

  // function handleClienteChange(clienteCodigoC) {
  //     setClienteSelecionado(clienteCodigoC);
  //   }

  function handleSubmit(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if(!props.modoEdicao){
        fetch(urlBackend + "/reservasC", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(reserva)
        })
        .then((resposta) => {
          return resposta.json()
        })
        .then((data) => {
          if (data.status){
            props.setModoEdicao(false)
            let novaLista = props.listaReserva;
            novaLista.push(reserva)
            props.setReserva(novaLista)
            props.buscarReserva()
            props.exibirTabela(true)
            setData(novaLista);
          }
          window.alert(data.mensagem)
        })
        .catch((erro) => {
          window.alert('Erro ao executar a requisição: ' + erro.message)
        })
      }else{
        fetch(urlBackend + "/reservasC" ,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(reserva)
        })
        .then((resposta) => {
          return resposta.json()
        }).then((data) => {
          if (data.status){
            props.setModoEdicao(false)
            let novaLista = props.listaReserva;
            novaLista.push(reserva)
            props.setReserva(novaLista)
            props.buscarReserva()
            props.exibirTabela(true)
            setData(novaLista);
          }
          window.alert(data.mensagem)
        })
      }
      setValidated(false)      
    }else{
      setValidated(true)
    }
    evento.preventDefault();
    evento.stopPropagation()

  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">

        <Form.Label column sm={2}>
          Período Inicial
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="date"
            id="periodoIn"
            value={reserva.periodoIn}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o período inicial.
          </Form.Control.Feedback>
        </Col>

        <Form.Label column sm={2}>
          Período Final
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="date"
            id="periodoFin"
            value={reserva.periodoFin}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o período final.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Quantidade
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="number"
            id="quantidade"
            value={reserva.quantidade}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe a quantidade.
          </Form.Control.Feedback>
        </Col>

        <Form.Label column sm={2}>
          Valor
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="int"
            // step="0.01"
            id="valor"
            value={reserva.valor}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o valor.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Label column sm={2}>
          Cliente
        </Form.Label>
        <Col sm={10}>
          <SeletorClientes
            onChange={(clienteCodigoC) =>
              setReserva({ ...reserva, cliente: clienteCodigoC })
            }
          />
        </Col>

      <Stack direction="horizontal" gap={3} className="mt-3">
        <Button variant="primary" type="submit">
          {props.modoEdicao ? "Atualizar" : "Cadastrar"}
        </Button>
        <Button variant="danger" onClick={() => props.exibirTabela(true)}>
          Voltar
        </Button>
      </Stack>
    </Form>
  );
}
