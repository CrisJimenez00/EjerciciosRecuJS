/*import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert, Row, Col, UncontrolledAccordion, AccordionItem,
  AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader,
  ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';
import { FARMACOS } from './componentes/datos';


const VentanaModalDiccionario = (props) => {
  const { className } = props;

  const list_to_option = (dic) => {
    return dic.map(d => <option>{d.codATC}|{d.descATC}</option>)
  }

  const [listado, setListado] = useState(list_to_option(props.diccionario))
  const [filtro, setFiltro] = useState("");
  const [farmaco, setFarmaco] = useState("");

  const handleChange = (event) => {

    if (event.target.name === "filtro") {
      setFiltro(event.target.value.toUpperCase());
      //Filtramos el diccionario para que pueda salir bien en el select
      setListado(list_to_option(props.diccionario.filter(x => x.descATC.includes(event.target.value.toUpperCase()))))
    }
    if (event.target.name === "selectMulti") {
      setFarmaco(event.target.value);
    }
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle}
        className={className} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>

            <Label sm={2} > Filtrar: </Label>
            <Col sm={10}>
              <Input onChange={handleChange}
                id="filtro"
                name="filtro"
                type="Text" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input onChange={handleChange} onClick={handleChange}
                id="selectMulti"
                name="selectMulti"
                type="select"
              >
                {listado}
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {farmaco}
          <Button
            color="primary"
            onClick={() => { props.add(farmaco); setListado(list_to_option(props.diccionario)) }}> 
            {props.aceptar}
          </Button>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div >
  );
}

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      rxseleccionar: "",
      rxenmascarar: "",
      diccionario: FARMACOS,
      incluir: true
    }
  }

  //Si no lo pongo aunque sea vacío me da error, por eso lo pongo así
  handleChange = (event) => {
  }

  add(datos) {
    this.toggleModal();

    //Para que separe el codigo del nombre
    let arr_farmaco = datos.split(" | ")

    if (arr_farmaco[0] == "") //Por si se selecciona la opción "SELECCIONE FÁRMACO"
      return;

    if (this.state.incluir) {

      if (this.state.rxseleccionar != "") //Si ya hay alguno le pone la coma
        this.state.rxseleccionar += ", ";

      this.state.rxseleccionar += arr_farmaco[0];
    }

    else {
      if (this.state.rxenmascarar != "") //Si ya hay alguno le pone la coma
        this.state.rxenmascarar += ", ";

      this.state.rxenmascarar += arr_farmaco[0];
    }
  }

  setIsOpen(d) {
    if (d == undefined) return;
    this.setState({ isOpen: d })
  }

  toggleModal() { this.setIsOpen(!this.state.isOpen); }

  listaIncluir(respuesta) { this.setState({ incluir: respuesta }); }

  vaciar_incluir() {
    let vacia = [];
    this.setState({ rxseleccionar: vacia })
  }

  vaciar_excluir() {
    let vacia = [];
    this.setState({ rxenmascarar: vacia })
  }

  render() {
    return (
      <>
        <div>
          <UncontrolledAccordion
            defaultOpen={[
              '1'
            ]}
            stayOpen
          >
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
                        value={this.state.rxseleccionar} />

                      <Button onClick={() => { this.toggleModal(); this.listaIncluir(true) }} color="info">Add</Button>
                      {" "}
                      <Button color="info" onClick={() => { this.vaciar_incluir() }}>Clear</Button>
                    </Alert>
                  </Col>

                  <Col>
                    <Alert color="danger">
                      Excluir X Medicamentos:
                      <Input
                        type="textarea"
                        name="rxenmascarar"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.rxenmascarar} />
                      <Button onClick={() => { this.toggleModal(); this.listaIncluir(false) }} color="danger">Add</Button>
                      {" "}
                      <Button color="danger" onClick={() => { this.vaciar_excluir() }}>Clear</Button>
                    </Alert>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
        <VentanaModalDiccionario
          diccionario={this.state.diccionario}
          add={(datos) => this.add(datos)}
          mostrar={this.state.isOpen}
          aceptar={"Añadir"}
          toggle={() => this.toggleModal()}
          titulo={"AddFÁRMACO"} />
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
export default App;*/
import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert, Row, Col, UncontrolledAccordion, AccordionItem,
  AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader,
  ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';
import { FARMACOS } from './componentes/datos';
const VentanaModalDiccionario = (props) => {
  
  const {
    className
  } = props;
  const[lista,setLista]=useState(FARMACOS);
  const[farmaco, setFarmaco]=useState('')
  const[obj,setObj]=useState(lista.map(f=>{return(<option>{f.codATC} | {f.descATC}</option>)}))
//
  
  const handleChange = (event) => {
    // COMPLETA ESTA FUNCION
    let resultado=event.target.value.split("|");
    setFarmaco(resultado[0]);

    let aux=[];
    setLista(lista.filter(x => x.descATC.includes(event.target.value.toUpperCase())))
    aux=lista;
    //aux=lista.filter(o=>event.target.value.include(o.descATC));
    
    setObj(aux.map(f=>{return(<option>{f.codATC} | {f.descATC}</option>)}))
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle}
        className={className} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={2} > Filtrar: </Label>
            <Col sm={10}>
              <Input onChange={handleChange}
                id="filtro"
                name="filtro"
                type="Text" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input onChange={handleChange} onClick={handleChange}
                id="selectMulti"
                name="selectMulti"
                type="select"
              >
                {obj}
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {farmaco}<Button color="primary"

            onClick={() => props.add(farmaco)}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div>
  );
}
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      rxseleccionar: "",
      rxenmascarar: "",
      diccionario: "FARMACOS",
      añadir:true,
    }
  }
  limpiarselec(){
    this.setState({rxseleccionar:""})
  }
  limpiarenmas(){
    this.setState({rxenmascarar:""});
  }
  handleChange = (event) => {

  }
  add(datos) {
    if(this.state.añadir){
      let cp=this.state.rxseleccionar;
      cp+=datos+", ";
      this.setState({rxseleccionar:cp})
    }else{
      let cp=this.state.rxenmascarar;
      cp+=datos+", ";
      this.setState({rxenmascarar:cp})
    }
    this.toggleModal();
  }
  setIsOpen(d) {
    if (d === undefined) return;
    this.setState({ isOpen: d })
  }
  toggleModal(boolean) { 
    this.setIsOpen(!this.state.isOpen);
    this.setState({añadir:boolean}) }
  render() {
    return (
      <>
        <div>
          <UncontrolledAccordion
            defaultOpen={[
              '1'
            ]}
            stayOpen
          >
            <AccordionItem>
              <AccordionHeader targetId="1">
                GESTION DE FARMACOS
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Row>
                  <Col>
                    <Alert color="info">
                      Incluir X Medicamentos:
                      <Input type="textarea"

                        name="rxseleccionar" onChange={this.handleChange.bind(this)}
                        value={this.state.rxseleccionar} />
                      <Button

                        onClick={() => { this.toggleModal(true) }} color="info">Add</Button>
                      {" "}<Button color="info"

                        onClick={()=>this.limpiarselec()}>Clear</Button>
                    </Alert>
                  </Col>
                  <Col>
                    <Alert color="danger">
                      Excluir X Medicamentos:
                      <Input type="textarea" name="rxenmascarar"

                        onChange={this.handleChange.bind(this)}
                        value={this.state.rxenmascarar} />
                      <Button

                        onClick={() => { this.toggleModal(false) }} color="danger">Add</Button>
                      {" "}<Button color="danger"

                        onClick={()=>this.limpiarenmas()}>Clear</Button>
                    </Alert>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
        <VentanaModalDiccionario diccionario={this.state.diccionario}
          add={(datos,añadir) => this.add(datos,añadir)} mostrar={this.state.isOpen} aceptar=
          {"Añadir"} toggle={() => this.toggleModal()} titulo={"Add" + this.state.diccionario} />

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