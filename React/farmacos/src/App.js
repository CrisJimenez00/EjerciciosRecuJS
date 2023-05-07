import React, { useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Alert,
  Row,
  Col,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";
import { FARMACOS } from "./componentes/datos";
const VentanaModalDiccionario = (props) => {
  const { className } = props;
  const [lista, setLista] = useState(FARMACOS);
  const [farmaco, setFarmaco] = useState("");
  const [filtro, setFiltro] = useState("");

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={2}> Filtrar: </Label>
            <Col sm={10}>
              <Input
                onChange={(x) => setFiltro(x.target.value)}
                id="filtro"
                name="filtro"
                type="Text"
              />
              {console.log(filtro)}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input
                onChange={(x) => setFarmaco(x.target.value)}
                id="selectMulti"
                name="selectMulti"
                type="select"
              >
                {lista.map((y) => {
                  if (
                    y.codATC.includes(filtro.toUpperCase()) ||
                    y.descATC.includes(filtro.toUpperCase())
                  ) {
                    return (
                      <option value={y.codATC}>
                        {y.codATC + " | " + y.descATC}
                      </option>
                    );
                  }
                })}
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {farmaco}
          <Button
            color="primary"
            onClick={() => {
              props.add(farmaco);
              setFarmaco("");
              setFiltro("");
            }}
          >
            {props.aceptar}
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div>
  );
};
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      rxseleccionar: "",
      rxenmascarar: "",
      diccionario: "FARMACOS",
      añadir: true,
    };
  }
  limpiarselec() {
    this.setState({ rxseleccionar: "" });
  }
  limpiarenmas() {
    this.setState({ rxenmascarar: "" });
  }
  handleChange = (event) => { };
  add(datos) {
    if (this.state.añadir) {
      let cp = this.state.rxseleccionar;
      cp += datos + ", ";
      this.setState({ rxseleccionar: cp });
    } else {
      let cp = this.state.rxenmascarar;
      cp += datos + ", ";
      this.setState({ rxenmascarar: cp });
    }
    this.toggleModal();
  }
  setIsOpen(d) {
    if (d === undefined) return;
    this.setState({ isOpen: d });
  }
  toggleModal(boolean) {
    this.setIsOpen(!this.state.isOpen);
    this.setState({ añadir: boolean });
  }
  render() {
    return (
      <>
        <div>
          <UncontrolledAccordion defaultOpen={["1"]} stayOpen>
            <AccordionItem>
              <AccordionHeader targetId="1">
                GESTION DE FARMACOS
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Row>
                  <Col>
                    <Alert color="info">
                      Incluir X Medicamentos:
                      <Input
                        type="textarea"
                        name="rxseleccionar"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.rxseleccionar}
                      />
                      <Button
                        onClick={() => {
                          this.toggleModal(true);
                        }}
                        color="info"
                      >
                        Add
                      </Button>{" "}
                      <Button color="info" onClick={() => this.limpiarselec()}>
                        Clear
                      </Button>
                    </Alert>
                  </Col>
                  <Col>
                    <Alert color="danger">
                      Excluir X Medicamentos:
                      <Input
                        type="textarea"
                        name="rxenmascarar"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.rxenmascarar}
                      />
                      <Button
                        onClick={() => {
                          this.toggleModal(false);
                        }}
                        color="danger"
                      >
                        Add
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() => this.limpiarenmas()}
                      >
                        Clear
                      </Button>
                    </Alert>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
        <VentanaModalDiccionario
          diccionario={this.state.diccionario}
          add={(datos, añadir) => this.add(datos, añadir)}
          mostrar={this.state.isOpen}
          aceptar={"Añadir"}
          toggle={() => this.toggleModal()}
          titulo={"Add" + this.state.diccionario}
        />

        <br />
      </>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Filter />
      </div>
    );
  }
}
export default App;
