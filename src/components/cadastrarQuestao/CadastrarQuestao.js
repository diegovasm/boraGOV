import axios from "axios"
import { Button, Card, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function CadastrarQuestao({ apiUrl, form, setForm }) {
  const navigate = useNavigate()
  const dataatual = new Date()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tags = form.tags.toUpperCase().split(" ")
      form.tags = [...tags]
      form.datacadastro = dataatual.toLocaleString("pt-BR")
      await axios.post(`${apiUrl}`, form);
      setForm({
        titulo: "",
        problema: "",
        resultadoesperado: "",
        tags: [],
        datacadastro: "",
        orgao: "",
        respostas: 0,
        views: 0,
        votos:0
      })
      navigate('/questoes')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form className="card-detalhe">
      <Card className="text-center">
        <Card.Header as="h4" className="card-header">
          Questão
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formQuestao">
            <Form.Label>Título da Questão:</Form.Label>
            <Form.Control
              className="det-titulo"
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Órgão:</Form.Label>
            <Form.Control
              className=""
              type="text"
              name="orgao"
              value={form.orgao}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
          <Form.Label>Relato da Questão:</Form.Label>
            <Form.Control
              className="det-problema"
              as="textarea"
              rows={10}
              type="text"
              name="problema"
              value={form.problema}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
          <Form.Label>Resultado Esperado</Form.Label>
            <Form.Control
              className="det-problema"
              as="textarea"
              rows={5}
              type="text"
              name="resultadoesperado"
              value={form.resultadoesperado}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags:</Form.Label>
            <Form.Control
              className=""
              type="text"
              name="tags"
              placeholder="Adicione as tags separadas por um espaço"
              value={form.tags}
              onChange={handleChange}
            />
          </Form.Group>

        </Card.Body>
        <Card.Footer className="text-muted det-footer">
          <Button
            type="submit"
            variant="success"
            className="btn-salvar"
            onClick={handleSubmit}
          >
            Salvar
          </Button>
          <Button
            variant="danger"
            className="btn-cancelar"
            onClick={() => navigate("/questoes")}
          >
            Cancelar
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  )
}
