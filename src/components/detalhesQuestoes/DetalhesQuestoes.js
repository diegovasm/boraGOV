import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalhesQuestoes.css";

export default function DetalhesQuestoes({ apiUrl }) {
  const [questao, setQuestao] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

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
  }, [id]);

  useEffect(() => {
    try {
      const incrementaView = async () => {
        const clone = questao;
        delete clone._id;
        clone.views++
        console.log(clone.views)
        await axios.put(`${apiUrl}/${id}`, clone);
      };

      incrementaView();
    } catch (error) {
      console.log(error);
    }
  }, );

  return (
    <Card className="text-center card-detalhe">
      <Card.Header as="h4" className="card-header">
        Questão
      </Card.Header>
      <Card.Body>
        <Card.Title as="h5" className="det-titulo">
          {questao.titulo}
        </Card.Title>
        <Card.Text className="det-problema">{questao.problema}</Card.Text>
        <Card.Text className="det-mais-info">
          <p>
            Data de Cadastro: {questao.datacadastro}
            <span> &nbsp; &nbsp; &nbsp; </span>Órgão: {questao.orgao}
          </p>
          <p>
            Tags: <span className="det-tags">{questao.tags}</span>{" "}
          </p>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted det-footer">
        <p className="det-footer-buttons">
          <Button variant="primary" className="">
            Atualizar
          </Button>
          <Button variant="danger" className="">
            Excluir
          </Button>
        </p>
        <p>2 days ago</p>
      </Card.Footer>
    </Card>
  );
}
