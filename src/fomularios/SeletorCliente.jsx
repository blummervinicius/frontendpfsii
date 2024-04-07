import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function SeletorClientes({ onChange }) {
  const [cliente, setCliente] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState("");

  useEffect(() => {
    fetch(urlBackend + "/cliente")
      .then((response) => response.json())
      .then((data) => {
        setCliente(data.listaCliente);
      })
      .catch((error) => {
        console.error("Erro ao carregar lista de clientes:", error);
      });
  }, []);

  function handleClienteChange(event) {
    const clienteSelecionado = event.target.value;
    setSelectedCliente(clienteSelecionado);
    
    onChange(clienteSelecionado);
  }

  return (
    <Form.Control
      as="select"
      value={selectedCliente}
      onChange={handleClienteChange}
    >
      <option value="">Selecione um cliente</option>
      {cliente.map((cliente) => (
        <option key={cliente.cli_codigoC} value={cliente.cli_codigoC}>
          {cliente.cli_nome}
        </option>
      ))}
    </Form.Control>
  );
}
