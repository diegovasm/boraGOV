import "./NavigationBar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../Images/logo.png";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton, NavDropdown } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar>
      <Container className="navigationBar" fluid>
        <Navbar.Brand href="#home">
          <img
            alt="BoraGoV logo"
            src={logo}
            width="120"
            height="40"
            className="align-top"
          />
        </Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="me-4"
            aria-label="Search"
          />
        </Form>
        {['Menu'].map(
        (variant) => (
          <DropdownButton
            as={ButtonGroup}
            key={variant}
            id={`dropdown-variants-${variant}`}
            variant={variant.toLowerCase()}
            title={variant}
          >
            <Dropdown.Item eventKey="1">Perfil</Dropdown.Item>
           
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Logout</Dropdown.Item>
          </DropdownButton>
        ),
      )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
