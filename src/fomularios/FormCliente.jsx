import { useState, useEffect } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
//import SearchBar from "../templates/searchbar/Searchbar" //adicionei

function FormCliente(props) {
  const [cliente, setCliente] = useState({ nome: '', cpf: '', telefone: ''});
  const [validated, setValidated] = useState(false);
  

  useEffect(() => {
    fetch(urlBackend + "/cliente", {method: "GET"})
    .then((resposta) => {
      return resposta.json();
    }).then((data) =>{
      setCliente(data);
    });
  },[]);


  function handleChange(e) {
    const { id, value } = e.target;
    setCliente({ ...cliente, [id]: value });
  }

  
  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity()) {
      const url = props.modoEdicao ? urlBackend + "/cliente" : urlBackend + "/cliente";
      const method = props.modoEdicao ? "PUT" : "POST";

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          if (data.status) {
            props.setModoEdicao(false);
            props.exibirTabela(true);
            props.setCliente(data); // Atualiza o estado cliente com os novos dados
          }
          window.alert(data.mensagem);
        })
        .catch((error) => {
          window.alert("Erro ao executar a requisição: " + error.message);
        });
    }
  }

  return (
    <div>
      

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do cliente"
              required
              value={cliente.nome}
              id="nome"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome do cliente!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o CPF do cliente"
              required
              value={cliente.cpf}
              id="cpf"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o CPF do cliente!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o telefone do cliente"
              required
              value={cliente.telefone}
              id="telefone"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o telefone do cliente!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Stack direction="horizontal" gap={3} className="mt-3">
        <Button variant="primary" type="submit">
          {props.modoEdicao ? "Atualizar" : "Cadastrar"}
        </Button>
        <Button variant="danger" onClick={() => props.exibirTabela(true)}>
          Voltar
        </Button>
        </Stack>
      </Form>
    </div>
  );
}

export default FormCliente;
