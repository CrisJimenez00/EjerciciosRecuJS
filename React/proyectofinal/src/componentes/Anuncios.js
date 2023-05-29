import React, { useState } from "react";
import { Table } from "reactstrap";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from "reactstrap";

export default function Anuncios(props) {
  const [clave, setClave] = useState("");
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [filtro, setFiltro] = useState("");
  const [usuarioAnuncio, setUsuarioAnuncio] = useState("");
  let lista = props.listaUsuarios;

  const handleChange = (event) => {
    if (event.target.name === "nombre") {
      setNombre(event.target.value);
    }
    if (event.target.name === "usuario") {
      setUsuario(event.target.value);
    }
    if (event.target.name === "clave") {
      setClave(event.target.value);
    }
  };

  //En caso de que esté vacío sale un mensaje
  const clicar = () => {
    if (nombre == "" || clave == "" || usuario == "") {
      props.setInfo("NO PUEDE TENER CAMPOS VACÍOS");
      return;
    }
    props.userInsert(nombre, usuario, clave);
  };

  function listar() {
    try {
      let usuarios = props.listaUsuariosAnuncios;

      // Asegúrate de que usuarios sea un arreglo antes de utilizarlo
      if (Array.isArray(usuarios)) {
        const rows = usuarios.map((usuario) => (
          <tr key={usuario.id_anuncio}>
            <td>{usuario.id_anuncio}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.id_cliente}</td>
            <td>
              <Button onClick={() => props.eliminarUsuario(usuario.id_cliente)}>
                Borrar{" "}
              </Button>
            </td>
          </tr>
        ));
        return <>{rows}</>;
      } else {
        console.error("No reconoce el array");
        return null; // O devuelve algún otro valor adecuado para tu caso
      }
    } catch (error) {
      console.error(error);
      return null; // O devuelve algún otro valor adecuado para tu caso
    }
  }
  return (
    <Row>
      <Col sm="4"></Col>
      <Col sm="4">
        <Card body>
          <CardTitle className="text-center" tag="h4">
            Alta de anuncio
          </CardTitle>
          <Form inline>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="nombre">
                Usuario
              </Label>

              <Input
                onChange={(x) => setUsuarioAnuncio(x.target.value)}
                id="selectMulti"
                name="selectMulti"
                type="select"
              >
                {lista.map((y) => {
                  if (y.id_cliente || y.nombre) {
                    return (
                      <option value={y.id_cliente}>
                        {y.id_cliente + " | " + y.nombre}
                      </option>
                    );
                  }
                })}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="imagen">
                Imagen
              </Label>
              <Input
                id="imagen"
                name="imagen"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="tiempo">
                Tiempo
              </Label>
              <Input
                id="tiempo"
                name="tiempo"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <br />
            <Button color="primary" size="lg" block onClick={clicar}>
              <strong>Alta</strong>
            </Button>
            <CardText className="text-danger">{props.info}</CardText>
          </Form>
        </Card>
      </Col>

      <Col sm="15">
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listar()} {/* Llamada a la función listar */}
            <tr>
              <th colSpan={4}>{props.info}</th>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
