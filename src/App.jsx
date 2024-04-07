import TelaCadCliente from "./telas/CadCliente";
import CadReservas from "./telas/CadReserva";
import CadVeiculos from "./telas/CadVeiculos";
import TelaMenu from "./telas/TelaMenu";
import Tela404 from "./telas/Tela404";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroCliente" element={<TelaCadCliente />} />
          <Route path="/cadastroReserva" element={<CadReservas />} />
          <Route path="/cadastroVeiculo" element={<CadVeiculos />} />
          <Route path="/" element={<TelaMenu />} />
          <Route path="#" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
