import { useState, useEffect } from "react";
import { Form, Button, Col, Row, Stack, Modal } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function FormVeiculo(props) {
  const [veiculo, setVeiculo] = useState({
    modelo: "",
    ano: "",
    placa: "",
    
  });
  const [reservasDisponiveis, setReservasDisponiveis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState("");

  useEffect(() => {
    carregarReservasDisponiveis();
  }, []);

  const carregarReservasDisponiveis = () => {
    fetch(urlBackend + "/reservasC")
      .then((response) => response.json())
      .then((data) => {
        setReservasDisponiveis(data);
      })
      .catch((error) =>
        console.error("Erro ao carregar reservas disponíveis:", error)
      );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVeiculo({ ...veiculo, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(veiculo),
    };

    fetch(urlBackend + "/veiculo", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          props.buscarVeiculos(); 
          props.exibirTabela(true);
          setShowModal(true);
        }
      })
      .catch((error) => {
        window.alert("Erro ao cadastrar veículo: " + error.message);
      });
  };

  const associarVeiculoReserva = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        res_codigoR: reservaSelecionada,
        vei_codigoV: veiculo.codigoV,
      }),
    };

    fetch(urlBackend + "/reservas_veiculos", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          window.alert("Veículo cadastrado e associado à reserva com sucesso!");
          setShowModal(false);
          setReservaSelecionada("");
          carregarReservasDisponiveis();
        } else {
          window.alert("Erro ao associar veículo à reserva: " + data.mensagem);
        }
      })
      .catch((error) => {
        window.alert("Erro ao associar veículo à reserva: " + error.message);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Modelo
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              id="modelo"
              value={veiculo.modelo}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Ano
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="int"
              id="ano"
              value={veiculo.ano}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Placa
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              id="placa"
              value={veiculo.placa}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
      
        <Stack direction="horizontal" gap={3} className="mt-3">
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
          <Button variant="danger" onClick={() => props.exibirTabela(true)}>
            Voltar
          </Button>
        </Stack>
      </Form>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Associar Veículo a uma Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={reservaSelecionada}
            onChange={(e) => setReservaSelecionada(e.target.value)}
            required
          >
            <option value="">Selecione uma reserva</option>
            {reservasDisponiveis.map((reserva) => (
              <option key={reserva.res_codigoR} value={reserva.res_codigoR}>
                {`Código: ${reserva.res_codigoR} - Cliente: ${reserva.cliente} - Período: ${reserva.periodoIn} a ${reserva.periodoFin}`}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={associarVeiculoReserva}>
            Associar Veículo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
