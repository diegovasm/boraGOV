import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalhesQuestoes.css";

export default function DetalhesQuestoes({ apiUrl }) {
  const [questao, setQuestao] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  let formQuestao = document.querySelectorAll("#formQuestao");
  let btnAtualizar = document.querySelector(".btn-atualizar");
  let btnSalvar = document.querySelector(".btn-salvar");
  let btnExcluir = document.querySelector(".btn-excluir");
  let btnCancelar = document.querySelector(".btn-cancelar");
  let btnVoltar = document.querySelector(".btn-voltar");

  useEffect(() => {
    try {
      const fetchQuestao = async () => {
        const response = await axios.get(`${apiUrl}/${id}`);
        setQuestao(response.data);
      };

      fetchQuestao();
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl,id]);

  useEffect(() => {
    try {
      const incrementaView = async () => {
        const clone = questao;
        delete clone._id;
        clone.views++;
        console.log(clone.views);
        await axios.put(`${apiUrl}/${id}`, clone);
      };

      incrementaView();
    } catch (error) {
      console.log(error);
    }
  });

  console.log(formQuestao);

  const atualizar = () => {
    formQuestao.forEach((element) => {
      element.removeAttribute("disabled");
    });
    btnAtualizar.classList.toggle("hide");
    btnSalvar.classList.toggle("hide");
    btnExcluir.classList.toggle("hide");
    btnCancelar.classList.toggle("hide");
    btnVoltar.classList.toggle("hide");
  };

  const handleChange = (e) => {
    setQuestao({ ...questao, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clone = { ...questao };
      delete clone._id;
      await axios.put(`${apiUrl}/${id}`, clone);
    } catch (error) {
      console.log(error);
    }

    formQuestao.forEach((element) => {
      element.setAttribute("disabled", "");
    });
    btnAtualizar.classList.toggle("hide");
    btnSalvar.classList.toggle("hide");
    btnExcluir.classList.toggle("hide");
    btnCancelar.classList.toggle("hide");
    btnVoltar.classList.toggle("hide");
  };

  return (
    <Form className="card-detalhe">
    <Card className="text-center">
      <Card.Header as="h4" className="card-header">
        Questão
      </Card.Header>
      <Card.Body>
        
          <Form.Group className="mb-3" controlId="formQuestao">
            <Form.Control
              disabled
              className="det-titulo"
              type="text"
              name="titulo"
              value={questao.titulo}
              onChange={handleChange}
            />
            <Form.Control
              disabled
              className="det-problema"
              as="textarea"
              rows={10}
              type="text"
              name="problema"
              value={questao.problema}
              onChange={handleChange}
            />
          </Form.Group>
        <Card.Text className="det-mais-info">
          <p>
            Data de Cadastro: {questao.datacadastro}
            <span> &nbsp; &nbsp; &nbsp; </span>Órgão: {questao.orgao}
          </p>
          <p>
            Tags: <span className="det-tags">{questao.tags}</span>{" "}
          </p>
        </Card.Text>

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
            onClick={atualizar}
          >
            Atualizar
          </Button>
          <Button variant="danger" className="btn-excluir">
            Excluir
          </Button>
          <Button
            variant="danger"
            className="btn-cancelar hide"
            onClick={() => (window.location.reload())}
          >
            Cancelar
          </Button>

      </Card.Body>
      <Card.Footer className="text-muted det-footer">
          <Button
            variant="primary"
            className="btn-voltar"
            onClick={() => navigate("/questoes")}
          >
            Voltar
          </Button>
      </Card.Footer>
    </Card>
  </Form>
  );
}
