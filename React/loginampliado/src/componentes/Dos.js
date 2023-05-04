import { useState } from "react";
import { Button, Form, Input, FormGroup, Label, Row, Col } from "reactstrap";

export default function Uno(props) {
    //hooks
    const [texto, setTexto] = useState("");


    const handleChange = (event) => {
        if (event.target.name === "texto") {
            setTexto(event.target.value)
        }
    }

    const handleSubmit = () => {

        if (texto !== "") {
            props.setTitulo(texto)
        }
    }


    return (
        <Row>
            <Col sm="4"></Col>
            <Col sm="4">
                <Form>
                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Label className="me-sm-2">Añade un título</Label>
                        <Input
                            id="texto"
                            name="texto"
                            placeholder="Introduzca un título"
                            onChange={handleChange} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Button onClick={handleSubmit}>Añadir titulo</Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row >
    )
}
