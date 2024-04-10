import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

export default function Menu() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mt-0"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MENU</Navbar.Brand>
        </LinkContainer>
        <br />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Fomulários" id="collapsible-nav-dropdown">
              <br />
              <br />
              <LinkContainer to="/cadastroCliente">
                <NavDropdown.Item>Cadastro Cliente</NavDropdown.Item>
              </LinkContainer>
              <br />
              <br />
              <LinkContainer to="cadastroReserva">
                <NavDropdown.Item>Cadastro Reserva</NavDropdown.Item>
              </LinkContainer>
              <br />
              <br />
              <LinkContainer to="cadastroVeiculo">
                <NavDropdown.Item>Cadastro Veículo</NavDropdown.Item>
              </LinkContainer>
              <br/>
              <br/>
              <LinkContainer to="vincularreservaveiculo">
                <NavDropdown.Item>Vincular Res/vei</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
