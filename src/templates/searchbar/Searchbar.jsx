import { RiSearchLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { Container, FormControl } from "react-bootstrap";
import { useRef, useState } from "react";
import "./searchbar.css";

export default function SearchBar({
  placeHolder,
  dados,
  campoChave,
  campoBusca,
  funcaoSelecao,
  valor,
}) {
  const inputBusca = useRef();
  const [termoBusca, setTermoBusca] = useState(valor ? valor : "");
  const [dadosLista, setDadosLista] = useState(dados);
  const [itemSelecionado, setItemSelecionado] = useState(false);

  function filtrarResultado() {
    if (!dados) return;
    setDadosLista(
      dados.filter((item) => {
        return termoBusca.length > 1
          ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase())
          : false;
      })
    );
    let componenteResultado = document.querySelector("[data-resultado]");
    if (dados.length > 0) {
      componenteResultado.style.display = "block";
    } else {
      componenteResultado.style.display = "none";
    }
  }

  return (
    <Container>
      <div className="barra">
        <RiSearchLine />
        <FormControl
          type="text"
          ref={inputBusca}
          placeholder={placeHolder}
          value={termoBusca}
          required
          onChange={(e) => {
            setTermoBusca(e.target.value.toLocaleLowerCase());
            filtrarResultado();
            if (!itemSelecionado) {
              e.target.setAttribute("aria-invalid", true);
              e.target.setCustomValidity("xxx");
            }
            else{
              e.target.removeAttribute('aria-invalid')
              e.target.setCustomValidity("")
            }
          }}
        ></FormControl>
        <GrFormClose 
          onClick={()=>{
            setTermoBusca('');
            filtrarResultado();
            setItemSelecionado(false);
            funcaoSelecao({});
            inputBusca.current.setAttribute('aria-invalid',true);
            inputBusca.current.setCustomValidity('xxx');
          }}
        />
      </div>
      <div className="resultado">
        <ul data-resultado>
          {dadosLista && dadosLista.map((item) => {
            return (
              <li
                key={item[campoChave]}
                onClick={() => {
                  setTermoBusca(item[campoBusca]);
                  setItemSelecionado(true);
                  funcaoSelecao(item);
                  inputBusca.current.setCustomValidity("");
                  let componenteResultado =
                    document.querySelector("[data-resultado]");
                  componenteResultado.style.display = "none";
                }}
              >
                {item[campoChave] + "-" + item[campoBusca]}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
