import { useState, useEffect } from "react";
import {
  Table,
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import FormVeiculo from "../fomularios/FormVeiculos";
import { RiSearchLine } from "react-icons/ri";

export default function TabVeiculos(props) {
  const [veiculos, setVeiculos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modeloEditado, setModeloEditado] = useState("");
  const [anoEditado, setAnoEditado] = useState("");
  const [placaEditada, setPlacaEditada] = useState("");
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [exibirFormCadastro, setExibirFormCadastro] = useState(false);

  useEffect(() => {
    buscarVeiculos();
  }, []);

  const buscarVeiculos = () => {
    fetch(urlBackend + "/veiculo")
      .then((response) => response.json())
      .then((data) => {
        setVeiculos(data);
      })
      .catch((error) => console.error("Erro ao buscar veículos:", error));
  };

  const handleExcluir = (codigoV) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigoV: codigoV }),
    };

    fetch(urlBackend + "/veiculo", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          buscarVeiculos();
        }
        window.alert(data.mensagem);
      })
      .catch((error) => {
        window.alert("Erro ao excluir veículo: " + error.message);
      });
  };

  const handleEditar = (veiculo) => {
    setVeiculoSelecionado(veiculo);
    setModeloEditado(veiculo.modelo);
    setAnoEditado(veiculo.ano);
    setPlacaEditada(veiculo.placa);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVeiculoSelecionado(null);
  };

  const handleSubmitEdicao = () => {
    // enviar os dados do veículo editado para o backend
    const dadosEditados = {
      codigoV: veiculoSelecionado.codigoV,
      modelo: modeloEditado,
      ano: anoEditado,
      placa: placaEditada,
    };
    // Envie os dados para o backend e atualize a lista de veículos após a edição
    console.log("Dados editados:", dadosEditados);
    //  fazer uma requisição PUT para enviar os dados para o backend
    // Após a resposta do backend, atualiza a lista de veículos e feche o modal de edição
    setShowModal(false);
    setVeiculoSelecionado(null);
    buscarVeiculos(); // Atualize a lista de veículos após a edição
  };

  function abrirFormCadastro() {
    setExibirFormCadastro(true);
  }

  function filtrarVeiculos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/veiculo", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaVeiculos) => {
        if (Array.isArray(listaVeiculos)) {
          const resultadoBusca = listaVeiculos.filter((veiculo) =>
            veiculo.toLowerCase.includ(termoBusca.toLowerCase())
          );
          setVeiculos(resultadoBusca);
        }
      });
    //.catch(error => console.error('Erro ao filtrar veículos:', error));
  }

  return (
    <Container>
      <Button variant="primary" onClick={abrirFormCadastro}>
        Cadastrar Novo Veículo
      </Button>
      {exibirFormCadastro ? (
        <FormVeiculo
          veiculo={props.veiculo}
          modoEdicao={props.modoEdicao}
          setModoEdicao={props.setModoEdicao}
          buscarVeiculo={props.buscarVeiculo}
          exibirTabela={() => setExibirFormCadastro(false)}
        />
      ) : (
        <div>
          <InputGroup className="mt-2">
            <FormControl
              type="text"
              id="termoBusca"
              placeholder="Buscar Veículos"
              onChange={filtrarVeiculos}
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
            <th className="text-center">Código</th>
            <th className="text-center">Modelo</th>
            <th className="text-center">Ano</th>
            <th className="text-center">Placa</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.vei_codigoV}>
              <td>{veiculo.vei_codigoV}</td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.ano}</td>
              <td>{veiculo.placa}</td>
              <td className="text-center">
                <Button
                  variant="outline-primary"
                  onClick={() => handleEditar(veiculo)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => handleExcluir(veiculo.vei_codigoV)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Veículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={modeloEditado}
                onChange={(e) => setModeloEditado(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAno">
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="int"
                value={anoEditado}
                onChange={(e) => setAnoEditado(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaca">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                value={placaEditada}
                onChange={(e) => setPlacaEditada(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmitEdicao}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
