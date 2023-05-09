import React, {useState} from 'react';
import {Row,Col,Card,CardTitle,CardText,Form,FormGroup,Button,Label,Input} from 'reactstrap';

export default function AppLogin(props) {
  const [clave,setClave]=useState('');
  const [usuario,setUsuario]=useState('');

  //Mira que
  const handleChange=(event)=>{
    if (event.target.name=="usuario"){
      setUsuario(event.target.value)
    }
    if (event.target.name=="clave"){
      setClave(event.target.value)
    }
  }
  //En caso de que esté vacío sale un mensaje
  const clicar=()=>{
    if (clave==''||usuario==''){
      props.setInfo("NO PUEDE TENER CAMPOS VACÍOS")
      return;
    }
    props.userLogin(usuario,clave)
  }

    return (
        <Row>
        <Col sm="4"></Col>
        <Col sm="4">
           <Card body>
             <CardTitle className="text-center" tag="h4">
               Log in
             </CardTitle>
           <Form inline>
             <FormGroup className="mb-2 me-sm-2 mb-sm-0">
               <Label  className="me-sm-2" for="usuario">User id</Label>
               <Input
                 id="usuario"
                 name="usuario"
                 placeholder="type your user id"
                 type="text"
                 onChange={handleChange}
               />
             </FormGroup>
             <FormGroup className="mb-2 me-sm-2 mb-sm-0">
               <Label className="me-sm-2" for="exampleclave">clave</Label>
               <Input
                 id="clave"
                 name="clave"
                 type="password"
                 onChange={handleChange}
               />
             </FormGroup>
             <br/>
             <Button color="primary" size="lg" block  onClick={clicar}>
               <strong>Log in</strong>
             </Button>
             <CardText className="text-danger">{props.info}</CardText>  
           </Form>
           </Card>
         </Col>
        </Row>
         )
        
}
