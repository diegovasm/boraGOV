
import { Route, Routes } from 'react-router-dom';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Questoes from "./components/questoes/Questoes"
import NavigationBar from "./components/navigationBar/NavigationBar"
import MenuLateral from "./components/menuLateral/MenuLateral"
import DetalhesQuestoes from './components/detalhesQuestoes/DetalhesQuestoes'
import CadastrarQuestoes from "./components/cadastrarQuestao/CadastrarQuestao"
import Login from "./components/login/Login"
import ErrorPage from "./components/errorPage/ErrorPage"
import { useState } from "react"

import { Container } from 'react-bootstrap'

function App() {
  
  const apiUrl = "https://ironrest.cyclic.app/boraGOV"
  const dataatual = new Date()
  const [form, setForm] = useState({
    titulo: "",
    problema: "",
    resultadoEsperado: "",
    tags: [],
    dataCadastro: dataatual.toLocaleString("pt-BR"),
    orgao: "",
    respostas: 0,
    views: 0,
    votos:0
  })



  return (
    <div className="App">
      

      <NavigationBar/>
      <Container className='principal'>

        <MenuLateral/>
        <Routes>
          <Route path= "/" element={<Login />}> </Route>
          <Route path= "/questoes" element={<Questoes apiUrl={apiUrl}/>}> </Route>
          <Route path= "/detalhes/:id" element={<DetalhesQuestoes apiUrl={apiUrl} form={form} setForm={setForm}/>}> </Route>
          <Route path= "/cadastrar" element={<CadastrarQuestoes apiUrl={apiUrl} form={form} setForm={setForm}/>}> </Route>
          <Route path= "*" element={<ErrorPage />}> </Route>
        </Routes>

      </Container>

  
    </div>
  );
}

export default App;
