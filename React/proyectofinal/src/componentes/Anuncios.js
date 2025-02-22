import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { PHPACTUALIZARORDEN } from "../../src/componentes/Datos";

export default function Anuncios(props) {
  const [anuncios, setAnuncio] = useState("");
  const [imagen, setImagen] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [ultimoOrden, setUltimoOrden] = useState("");
  const [usuarioAnuncio, setUsuarioAnuncio] = useState("");
  // const [lista2, setLista2] = useState([]);
  // const [anunciosOrdenados, setAnunciosOrdenados] = useState([]);

  let lista = props.listaUsuarios;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "imagen") {
      setImagen(value);
    }
    if (name === "tiempo") {
      setTiempo(value);
    }
  };

  //En caso de que esté vacío sale un mensaje
  const clicar = () => {
    if (imagen === "" || tiempo === "" || usuarioAnuncio === "") {
      props.setInfo("NO PUEDE TENER CAMPOS VACÍOS");
      return;
    }
    let ordenImagen = parseInt(ultimoOrden) + 1;
    props.anuncioInsert(ordenImagen, imagen, tiempo, usuarioAnuncio);
  };

  /*Funciona el listar pero la funcionalidad de los botones falla */


  // const handleMoveUp = async (anuncios, index) => {
  //   if (index === 0) return;
  
  //   const anuncioAnterior = anuncios[index - 1];
  //   [anuncios[index], anuncios[index - 1]] = [anuncioAnterior, anuncios[index]];
  
  //   // Intercambiar los valores del campo 'orden' entre los anuncios
  //   const tempOrden = anuncios[index].orden;
  //   anuncios[index].orden = anuncioAnterior.orden;
  //   anuncioAnterior.orden = tempOrden;
  
  //   await actualizarAnunciosEnBaseDeDatos(
  //     anuncios[index].id_anuncio,
  //     anuncios[index].orden
  //   );
  //   await actualizarAnunciosEnBaseDeDatos(
  //     anuncioAnterior.id_anuncio,
  //     anuncioAnterior.orden
  //   );
  
  //   setTimeout(() => {
  //     setAnuncio([...anuncios]); // Actualizar la variable de estado con el nuevo cambio
  //   }, 700);
  // };
  
  // const handleMoveDown = async (anuncios, index) => {
  //   if (index === anuncios.length - 1) return;
  
  //   const anuncioSiguiente = anuncios[index + 1];
  //   [anuncios[index], anuncios[index + 1]] = [
  //     anuncioSiguiente,
  //     anuncios[index],
  //   ];
  
  //   // Intercambiar los valores del campo 'orden' entre los anuncios
  //   const tempOrden = anuncios[index].orden;
  //   anuncios[index].orden = anuncioSiguiente.orden;
  //   anuncioSiguiente.orden = tempOrden;
  
  //   await actualizarAnunciosEnBaseDeDatos(
  //     anuncios[index].id_anuncio,
  //     anuncios[index].orden
  //   );
  //   await actualizarAnunciosEnBaseDeDatos(
  //     anuncioSiguiente.id_anuncio,
  //     anuncioSiguiente.orden
  //   );
  
  //   setTimeout(() => {
  //     setAnuncio([...anuncios]); // Actualizar la variable de estado con el nuevo cambio
  //   }, 700);
  // };
  const handleMoveUp = async (anuncios, index) => {
    if (index === 0) return;
  
    const anuncioAnterior = anuncios[index - 1];
    [anuncios[index], anuncios[index - 1]] = [anuncioAnterior, anuncios[index]];
  
    // Intercambiar los valores del campo 'orden' entre los anuncios
    const tempOrden = anuncios[index].orden;
    anuncios[index].orden = anuncioAnterior.orden;
    anuncioAnterior.orden = tempOrden;
  
    await actualizarAnunciosEnBaseDeDatos(
      anuncios[index].id_anuncio,
      anuncios[index].orden
    );
    await actualizarAnunciosEnBaseDeDatos(
      anuncioAnterior.id_anuncio,
      anuncioAnterior.orden
    );
  
    setTimeout(() => {
      setAnuncio([...anuncios]); // Actualizar la variable de estado con el nuevo cambio
    }, 700);
  };
  
  const handleMoveDown = async (anuncios, index) => {
    if (index === anuncios.length - 1) return;
  
    const anuncioSiguiente = anuncios[index + 1];
    [anuncios[index], anuncios[index + 1]] = [
      anuncioSiguiente,
      anuncios[index],
    ];
  
    // Intercambiar los valores del campo 'orden' entre los anuncios
    const tempOrden = anuncios[index].orden;
    anuncios[index].orden = anuncioSiguiente.orden;
    anuncioSiguiente.orden = tempOrden;
  
    await actualizarAnunciosEnBaseDeDatos(
      anuncios[index].id_anuncio,
      anuncios[index].orden
    );
    await actualizarAnunciosEnBaseDeDatos(
      anuncioSiguiente.id_anuncio,
      anuncioSiguiente.orden
    );
  
    setTimeout(() => {
      setAnuncio([...anuncios]); // Actualizar la variable de estado con el nuevo cambio
    }, 700);
  };

  
  // const actualizarAnunciosEnBaseDeDatos = async (id_anuncio, nuevoOrden) => {
  //   try {
  //     const response = await axios.post(PHPACTUALIZARORDEN, {
  //       id_anuncio: id_anuncio,
  //       nuevoOrden: nuevoOrden
  //     });
  //     console.log(response);
  
  //     console.log("Orden de anuncios actualizado en la base de datos");
  //   } catch (error) {
  //     console.error(
  //       "Error al actualizar el orden de anuncios en la base de datos:",
  //       error
  //     );
  //   }
  // };
  const actualizarAnunciosEnBaseDeDatos = async (id_anuncio, nuevoOrden) => {
    try {
      const response = await axios.post(PHPACTUALIZARORDEN, {
        id_anuncio: id_anuncio,
        nuevoOrden: nuevoOrden
      });
      console.log(response);
  
      console.log("Orden de anuncios actualizado en la base de datos");
    } catch (error) {
      console.error(
        "Error al actualizar el orden de anuncios en la base de datos:",
        error
      );
    }
  };
  
  

  // const listar = () => {
  //   try {
  //     let anuncios = props.listaAnuncios;
  //     console.log(anuncios);
  //     // Asegúrate de que anuncios sea un cambio antes de utilizarlo
  //     if (Array.isArray(anuncios)) {
  //       let usuarioActual = null;
  //       let usuarioAnterior = null;
  //       let usuarioSiguiente = null;

  //       const listaAnuncios = anuncios.map((anuncio, index) => {
  //         if (usuarioActual !== anuncio.id_cliente) {
  //           usuarioActual = anuncio.id_cliente;
  //           usuarioAnterior = null;
  //           usuarioSiguiente = null;
  //         }

  //         if (index > 0) {
  //           usuarioAnterior = anuncios[index - 1].id_cliente;
  //         }

  //         if (index < anuncios.length - 1) {
  //           usuarioSiguiente = anuncios[index + 1].id_cliente;
  //         }

  //         return (
  //           <tr key={anuncio.id_anuncio}>
  //             <td>{anuncio.id_anuncio}</td>
  //             <td>{anuncio.imagen}</td>
  //             <td>{anuncio.id_cliente}</td>
  //             <td>
  //               {index > 0 && (
  //                 <Button onClick={() => handleMoveUp(anuncios, index)}>
  //                   <span>&uarr;</span>
  //                 </Button>
  //               )}
  //               {index < anuncios.length - 1 && (
  //                 <Button onClick={() => handleMoveDown(anuncios, index)}>
  //                   <span>&darr;</span>
  //                 </Button>
  //               )}
  //             </td>
  //           </tr>
  //         );
  //       });

  //       return listaAnuncios;
  //     } else {
  //       console.error("No se reconoce el array de anuncios");
  //       return null; // O devuelve algún otro valor adecuado para tu caso
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return null; // O devuelve algún otro valor adecuado para tu caso
  //   }
  // };
  const listar = () => {
    try {
      let anuncios = props.listaAnuncios;
      console.log(anuncios);
      // Asegúrate de que anuncios sea un array antes de utilizarlo
      if (Array.isArray(anuncios)) {
        //anuncios.sort((a, b) => a.orden - b.orden); // Ordenar el array de anuncios por el atributo 'orden'
  
        let usuarioActual = null;
        let usuarioAnterior = null;
        let usuarioSiguiente = null;
  
        const listaAnuncios = anuncios.map((anuncio, index) => {
          if (usuarioActual !== anuncio.id_cliente) {
            usuarioActual = anuncio.id_cliente;
            usuarioAnterior = null;
            usuarioSiguiente = null;
          }
  
          if (index > 0) {
            usuarioAnterior = anuncios[index - 1].id_cliente;
          }
  
          if (index < anuncios.length - 1) {
            usuarioSiguiente = anuncios[index + 1].id_cliente;
          }
  
          return (
            <tr key={anuncio.id_anuncio}>
              <td>{anuncio.id_anuncio}</td>
              <td>{anuncio.imagen}</td>
              <td>{anuncio.id_cliente}</td>
              <td>
                {index > 0 && (
                  <Button onClick={() => handleMoveUp(anuncios, index)}>
                    <span>&uarr;</span>
                  </Button>
                )}
                {index < anuncios.length - 1 && (
                  <Button onClick={() => handleMoveDown(anuncios, index)}>
                    <span>&darr;</span>
                  </Button>
                )}
              </td>
            </tr>
          );
        });
  
        return listaAnuncios;
      } else {
        console.error("No se reconoce el array de anuncios");
        return null; // O devuelve algún otro valor adecuado para tu caso
      }
    } catch (error) {
      console.error(error);
      return null; // O devuelve algún otro valor adecuado para tu caso
    }
  };
  

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
                onChange={(x) => {
                  setUsuarioAnuncio(x.target.value);
                  props.userListarAnuncio(x.target.value);
                }}
                id="selectMulti"
                name="selectMulti"
                type="select"
              >
                <option value="">Seleccionar usuario</option>
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
                name="imagen" // nombre del campo para imagen
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
                name="tiempo" // nombre del campo para tiempo
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
              <th>Imagen</th>
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
