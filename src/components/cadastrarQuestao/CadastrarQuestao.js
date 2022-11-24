import axios from "axios"
import { Button, Card, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function CadastrarQuestao({ apiUrl, form, setForm }) {
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${apiUrl}`, form)
    } catch (error) {
      console.log(error)
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
            <Form.Label>Título da Questão</Form.Label>
            <Form.Control
              className="det-titulo"
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Órgão do Usuário</Form.Label>
            <Form.Control
              className=""
              type="text"
              name="orgao"
              value={form.orgao}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              className=""
              type="text"
              name="tags"
              placeholder="Adicione uma tag por vez"
              value={form.tags}
              onChange={handleChange}
            />
            <Button
              variant="primary"
              className="btn-salvar"
              onClick={handleSubmit}
            >
              Adicionar tag
            </Button>
          </Form.Group>
          <Form.Group>
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

          <Card.Text className="det-mais-info">
            <p>Data de Cadastro: {form.dataCadastro}</p>
            <p>
              Tags: <span className="det-tags">{form.tags}</span>{" "}
            </p>
          </Card.Text>

          <Button
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
        </Card.Body>
        <Card.Footer className="text-muted det-footer">

        </Card.Footer>
      </Card>
    </Form>
  )
}
