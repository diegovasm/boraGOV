import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Spinner, Table } from "react-bootstrap"

export default function Questoes ({apiUrl}){

    const [questoes, setQuestoes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const fetchQuestoes = async () => {
                const response = await axios.get(apiUrl)
                setQuestoes(response.data)
                setIsLoading(false)
            }

            fetchQuestoes()

        } catch (error) {

            console.log(error)
        }
    }, [apiUrl])

    const renderQuestoes = questoes.map((questao)=> {
        return (
            <tr key={questao._id}>
                <td>{questao.titulo}</td>
                <td>{questao.problema}</td>
                <td>{questao.resultadoesperado}</td>
                <td>{questao.tags}</td>
                {/* { { <td> }
                    <Button variant="info" size="sm">
                        <Link className="nav-link" to={`/funcionarios/${employee._id}`}>Ver detalhes</Link>
                    </Button>
                </td> } */}
            </tr>
        )
    })

    return (
        <Container>
            {isLoading && <Spinner className="mt-4" animation="border" />}
            {!isLoading &&
                <div>
                    {/* <Form className="my-4">
                        <Form.Control
                            type="search"
                            placeholder="Procurar funcionário"
                            value={ search }
                            onChange={ (e) => setSearch(e.target.value) }
                        />
                    </Form> */}
                    <Table className="mt-4" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Problema</th>
                                <th>Resultado Esperado</th>
                                <th>Tags</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                         <tbody>
                            { renderQuestoes }
                        </tbody>
                    </Table>
                </div>
            }
        </Container>

    )

}