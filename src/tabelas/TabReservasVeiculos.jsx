import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
  Stack,
} from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";

export default function TableReservasVeiculos(props) {
  function filtrarReservasVeiculos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/reservas_veiculos", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaReserva_veiculos) => {
        if (Array.isArray(listaReserva_veiculos)) {
          const resultadoBusca = listaReserva_veiculos.filter(
            (reserva_veiculos) =>
              reserva_veiculos.codigoV
                .toLowerCase()
                .includes(termoBusca.toLowerCase())
          );
          props.setCategorias(resultadoBusca);
        }
      });
  }
  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Vincular Reserva e Veículo
      </Button>
      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Buscar"
          onChange={filtrarReservasVeiculos}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th className="text-center">Código Reserva</th>
            <th className="text-center">Código Veículo</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {props.listaReservas_veiculos?.map((reservas_veiculos) => {
            return (
              <tr key={reservas_veiculos.codigoR}>
                <td>{reservas_veiculos.codigoR}</td>
                <td>{reservas_veiculos.codigoV}</td>
                <td>
                  <Stack
                    className="justify-content-center"
                    direction="horizontal"
                    gap={2}
                  >
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Deseja atualizar os dados da reserva?"
                          )
                        ) {
                          props.editar(reservas_veiculos);
                        }
                      }}
                    ></Button>
                  </Stack>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
