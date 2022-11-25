import "./NavigationBar.css"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import logo from "../../Images/boraGOV.png"
import Dropdown from "react-bootstrap/Dropdown"
import { Button, DropdownButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function NavigationBar({setLogin}) {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  }

  const handleOnQuestion = () => {
    navigate(`/cadastrar`, { replace: true })
  }
  const handleOnImageClick = () => {
    navigate(`/questoes`, { replace: true })
  }
  const handleLogout = () => {
    setLogin(true)
    navigate('/', {replace:true})
  }

  useEffect(() => {

    try{

      const keyDownHandler = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
  
          navigate(`/questoes/${search}`, { replace: true });
        }
      }
  
      document.addEventListener("keydown", keyDownHandler);
  
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      }
    }catch (error){
      console.log(error)
    }
  })

  return (
    <Navbar>
      <Container className="navigationBar" fluid>
        <Navbar.Brand>
          <img
            
            alt="BoraGoV logo"
            src={logo}
            width="80"
            height="40"
            className="align-top"
            onClick={handleOnImageClick}
          />
        </Navbar.Brand>

        <Form className="navSearch">
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="me-4"
            aria-label="Search"
            value={search}
            onChange={handleOnChange}
          />
        </Form>
        <Button onClick={handleOnQuestion} variant="outline-primary">
          Nova Questão
        </Button>
        <DropdownButton align="end" id="dropdown-menu-align-end" title="Menu">
          <Dropdown.Item eventKey="1">Perfil</Dropdown.Item>
          <Dropdown.Item eventKey="2">Configurações</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
      </Container>
    </Navbar>
  );
}
