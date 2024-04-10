import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import Pagina from "../templates/Pagina";
import TableReservasVeiculos from "../tabelas/TabReservasVeiculos";
import FommReservasVeiculos from "../fomularios/FormReservasVeiculos";


export default function CadReservasVeiculos(){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [reservas_veiculos, setReservas_veiculos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [reservas_veiculosEdicao, setReservas_veiculosEdicao] = useState({
        codigoR: "",
        codigoV: "", 
    });

    
  function prepararTela(reservas_veiculos) {
    setModoEdicao(true);
    setReservas_veiculosEdicao(reservas_veiculos);
    setExibirTabela(false);
  }
  function excluirReservaVeiculos(reservas_veiculos) {
    fetch(urlBackend + "/reservas_veiculos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservas_veiculos),
    }).then((resposta) => {
      window.alert("Reserva excluída com sucesso!!!");
      
      return resposta.json();
    });
  }

  useEffect(() => {
    buscar();
  }, []);

    function buscar() {
    fetch(urlBackend + "/reservas_veiculos", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setReservas_veiculos(dados);
        } 
      });
  }
return (
  <Pagina>
  <Container className="border">
    <Alert variant={"secondary"}>Vincular reservas e veículos</Alert>
    {exibirTabela ? (
      <TableReservasVeiculos
        listaReservas_veiculos={reservas_veiculos}
        setReservas_veiculos={setReservas_veiculos}
        exibirTabela={setExibirTabela}
        editar={prepararTela}
        deletar={excluirReservaVeiculos}
      />
    ) : (
      <FommReservasVeiculos
        listaReservas_veiculos={reservas_veiculos}
        setReservas_veiculos={setReservas_veiculos}
        exibirTabela={setExibirTabela}
        modoEdicao={modoEdicao}
        editar={prepararTela}
        setModoEdicao={setModoEdicao}
        reservas_veiculos={reservas_veiculosEdicao}
        buscar={buscar}
        />
        )}
        </Container>
    </Pagina>
    );



}