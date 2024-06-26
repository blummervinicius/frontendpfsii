import {
  Button,
  Container,
  FormControl, //comentei
  InputGroup,
  Table,
} from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";




export default function TabelaCliente(props) {
  // const [cliente, setCliente] = useState([]);

  // useEffect(()=> {
  //   buscarCliente();  
  // }, [])

  // const buscarCliente = () => {
  //   fetch(urlBackend + "/cliente", {method: "GET"})
  //   .then((resposta) => {return resposta.json()})
  //   .then((data) => {
  //     setCliente(data);
  //   })
  //   .catch((error) => console.error('Erro ao buscar clientes:' , error));
  // };

  // const filtrarCliente = (termoBusca) => {
  //   const resultadoBusca = cliente.filter((cliente) =>
  //     cliente.nome.toLowerCase().includes(termoBusca.toLowerCase())
  //   );
  //   return resultadoBusca;
  // };

  // const handleBuscaChange = (e) => {
  //   const termoBusca = e.currentTarget.value;
  //   const resultadoBusca = filtrarCliente(termoBusca);
  //   props.setCliente(resultadoBusca);
  // };

  function filtrarCliente(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/cliente", { method: "GET" })
      .then((resposta) => {return resposta.json()})
      .then((listaCliente) => {
        if (Array.isArray(listaCliente)) {
          const resultadoBusca = listaCliente.filter((cliente) =>
            cliente.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setCliente(resultadoBusca);
        }
      });
  }

  return (
    <Container>
      <Button onClick={() => props.exibirTabela(false)}>Novo Cadastro</Button>
      <InputGroup className="mt-2">
        <FormControl 
          type="text"
          id="termobusca"
          placeholder="Buscar"
          onChange={filtrarCliente}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
          </tr>
        </thead>

        {props.listaCliente?.length > 0 ? (
          <tbody>
            {props.listaCliente?.map((cliente) => {
              return (
                <tr key={cliente.codigoC}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.telefone}</td>
                  <td>
                    <Button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Deseja atualizar os dados do cliente?"
                          )
                        ) {
                          props.editar(cliente);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </Button>{" "}
                    <Button
                      onClick={() => {
                        if (window.confirm("Deseja excluir permanentemente?")) {
                          props.excluir(cliente);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            {/* <tr>
              <td colSpan={4}>Nenhum cliente encontrado</td>
            </tr> */}
          </tbody>
        )}
      </Table>
    </Container>
  );
}
