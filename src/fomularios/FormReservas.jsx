import { useState } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import SeletorClientes from "./SeletorCliente";

export default function FormReservasC(props) {
  const [reserva, setReserva] = useState({
    cli_codigoC: "",
    res_periodoIn: "",
    res_periodoFin: "",
    res_quantidade: "",
    res_valor: "",
  });
  const [validated, setValidated] = useState(false);
  //const [clienteSelecionado, setClienteSelecionado] = useState(null);

  function handleChange(e) {
    const { id, value } = e.target;
    setReserva({ ...reserva, [id]: value });
  }

  // function handleClienteChange(clienteCodigoC) {
  //     setClienteSelecionado(clienteCodigoC);
  //   }

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      //reserva.cli_codigoC = clienteSelecionado || null;

      const requestOptions = {
        method: props.modoEdicao ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
      };

      fetch(urlBackend + "/reservasC", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            props.setModoEdicao(false);
            props.buscarReservas();
            props.exibirTabela(true);
          }
          window.alert(data.mensagem);
        })
        .catch((error) => {
          window.alert("Erro ao executar a requisição: " + error.message);
        });

      setValidated(false);
    } else {
      setValidated(true);
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Cliente
        </Form.Label>
        <Col sm={10}>
          <SeletorClientes
            onChange={(clienteCodigoC) =>
              setReserva({ ...reserva, cli_codigoC: clienteCodigoC })
            }
          />
        </Col>
        <Form.Label column sm={2}>
          Período Inicial
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="date"
            id="res_periodoIn"
            value={reserva.res_periodoIn}
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
            id="res_periodoFin"
            value={reserva.res_periodoFin}
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
            id="res_quantidade"
            value={reserva.res_quantidade}
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
            id="res_valor"
            value={reserva.res_valor}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o valor.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

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
