import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalhesQuestoes.css";

export default function DetalhesQuestoes({ apiUrl }) {
  const [questao, setQuestao] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formularioAtivo, setFormularioAtivo] = useState(false);

  const incrementaView = () => {
    const clone = questao;
    delete clone._id;
    clone.views++;
    axios.put(`${apiUrl}/${id}`, clone);
    navigate("/questoes");
  };

  useEffect(() => {
    try {
      const fetchQuestao = async () => {
        const response = await axios.get(`${apiUrl}/${id}`);
        setQuestao(response.data);
        setIsLoading(false);
      };

      fetchQuestao();
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl, id]);


  const mudaFormulario = () => {
    let formQuestao = document.querySelectorAll(".formQuestao");
    let btnAtualizar = document.querySelector(".btn-atualizar");
    let btnSalvar = document.querySelector(".btn-salvar");
    let btnExcluir = document.querySelector(".btn-excluir");
    let btnCancelar = document.querySelector(".btn-cancelar");
    let btnVoltar = document.querySelector(".btn-voltar");

    if (!formularioAtivo){      
      formQuestao.forEach((element) => {
        element.removeAttribute("disabled");
      });
    } else {      
      formQuestao.forEach((element) => {
        element.setAttribute("disabled", "");
      });
    }
    btnAtualizar.classList.toggle("hide");
    btnSalvar.classList.toggle("hide");
    btnExcluir.classList.toggle("hide");
    btnCancelar.classList.toggle("hide");
    btnVoltar.classList.toggle("hide");

    setFormularioAtivo(!formularioAtivo)
  };

  const handleChange = (e) => {
    setQuestao({ ...questao, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {   
    mudaFormulario();
    e.preventDefault();    
    try {
      const clone = { ...questao };
      delete clone._id;
      await axios.put(`${apiUrl}/${id}`, clone);
    } catch (error) {
      console.log(error);
    }   
  };

  const deleteQuestao = async () => {
    await axios.delete(`${apiUrl}/${id}`);
    navigate("/questoes");
  };

  return (
    <Form className="card-detalhe">
      {isLoading && (
        <div className="questoes-spinner">
          <Spinner className="mt-4" animation="border" />
        </div>
      )}
      {!isLoading && (
        <Card className="text-center">
          <Card.Header as="h5" className="card-header">
            Questão
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formQuestao1">
              <Form.Control
                disabled
                className="det-titulo formQuestao"
                type="text"
                name="titulo"
                value={questao.titulo || ""}
                onChange={handleChange}
              />
              <Form.Control
                disabled
                className="det-problema formQuestao"
                as="textarea"
                rows={5}
                type="text"
                name="problema"
                value={questao.problema || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuestao2">
              <Form.Label>Resultado Esperado:</Form.Label>
              <Form.Control
                disabled
                className="det-problema formQuestao"
                as="textarea"
                rows={3}
                type="text"
                name="resultadoesperado"
                value={questao.resultadoesperado || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Card.Text className="det-mais-info">
              Data de Cadastro: {questao.datacadastro || ""}{" "}
              <span> &nbsp; &nbsp; &nbsp; </span>Órgão: {questao.orgao || ""}
            </Card.Text>
            <Card.Text className="det-mais-info">
              Tags: <span className="det-tags">{questao.tags || ""}</span>{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted det-footer">
            <p>
              <Button
                variant="success"
                className="btn-salvar hide"
                onClick={handleSubmit}
              >
                Salvar
              </Button>
              <Button
                variant="primary"
                className="btn-atualizar"
                onClick={mudaFormulario}
              >
                Atualizar
              </Button>
              <Button
                variant="danger"
                className="btn-excluir"
                onClick={deleteQuestao}
              >
                Excluir
              </Button>
              <Button
                variant="danger"
                className="btn-cancelar hide"
                onClick={()=>navigate(`/questoes/`)}
              >
                Cancelar
              </Button>
            </p>
            <Button
              variant="primary"
              className="btn-voltar"
              onClick={incrementaView}
            >
              Voltar
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Form>
  );
}
