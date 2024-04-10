import { useState } from "react";
import { urlBackend } from "../assets/funcoes";
import { Form, Button, Col, Stack } from "react-bootstrap";

export default function FommReservasVeiculos(props) {
  //const [setData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [reservas_veiculos, setReservas_veiculos] = useState(
    props.reservas_veiculos
  );

  // function manipularOnChange(e) {
  //   const elementForm = e.currentTarget;
  //   const id = elementForm.id;
  //   const valor = elementForm.value;
  //   setReservas_veiculos({ ...reservas_veiculos, [id]: valor });
  // }
  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      const requestOptions = {
        method: props.modoEdicao ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservas_veiculos),
      };
  
      fetch(urlBackend + "/reservas_veiculos", requestOptions)
        .then((resposta) => resposta.json())
        .then((dados) => {
          if (dados.status) {
            props.setModoEdicao(false);
            const novaLista = [...props.listaReservas_veiculos];
            if (!props.modoEdicao) {
              novaLista.push(reservas_veiculos);
            }
            props.setReservas_veiculos(novaLista);
            props.exibirTabela(true);
            window.alert(dados.mensagem);
          } else {
            window.alert("Erro ao executar a requisição: " + dados.mensagem);
          }
        })
        .catch((erro) => {
          window.alert("Erro ao executar a requisição: " + erro.message);
        });
      setValidated(false);
    } else {
      setValidated(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }
  
  function manipularOnChange(evento) {
    const { id, value } = evento.target;
    setReservas_veiculos((prevReservasVeiculos) => ({
      ...prevReservasVeiculos,
      [id]: value,
    }));
  }
  
  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={manipulaSubmissao}
        variant="light"
      >
        
          <Col>
            <Form.Group>
              <Form.Label>Vincular Reserva</Form.Label>
              <Form.Control
                value={reservas_veiculos.codigoR}
                type="text"
                placeholder="Digite o código da reserva"
                id="codigoR"
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código da reserva!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        
       
          <Col>
            <Form.Group>
              <Form.Label>Vincular Veículo</Form.Label>
              <Form.Control
                value={reservas_veiculos.codigoV}
                type="text"
                placeholder="Digite o código do veículo"
                id="codigoV"
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o código do veiculo!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
       

        <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
          <Button variant="primary" type="submit">
            {props.modoEdicao ? "Atualizar" : "Vincular"}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              props.exibirTabela(true);
            }}
          >
            Voltar
          </Button>
        </Stack>
      </Form>
    </>
  );
}
