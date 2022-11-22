import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalhesQuestoes.css"

export default function DetalhesQuestoes({ apiUrl }) {
  const [questao, setQuestao] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(`${apiUrl}/${id}`)

  useEffect(() => {
    try {
      const fetchQuestao = async () => {
        const response = await axios.get(`${apiUrl}/${id}`);
        console.log(response.data)
        setQuestao(response.data);
        setIsLoading(false);
      };

      fetchQuestao();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <Card className="text-center card-detalhe" >
      <Card.Header as="h4" className="card-header">Questão</Card.Header>
      <Card.Body>
        <Card.Title as="h5" className="det-titulo">{questao.titulo}</Card.Title>
        <Card.Text  className="det-problema">
            {questao.problema}
        </Card.Text>
        <Card.Text className="det-mais-info">
          <p>Data de Cadastro: {questao.datacadastro}<span> &nbsp; &nbsp; &nbsp; </span>Órgão: {questao.orgao}</p>
          <p>Tags: <span className="det-tags">{questao.tags}</span> </p>
        </Card.Text>
        
      </Card.Body>
      <Card.Footer className="text-muted det-footer">
        <p><Button variant="primary" className="">Go somewhere</Button></p>
        <p>2 days ago</p>
      </Card.Footer>
    </Card>
  );
}
