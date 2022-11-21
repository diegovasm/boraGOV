import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

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
    <Card className="text-center">
      <Card.Header>Questão</Card.Header>
      <Card.Body>
        <Card.Title>{questao.titulo}</Card.Title>
        <Card.Text>
            {questao.problema}
        </Card.Text>

        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}
