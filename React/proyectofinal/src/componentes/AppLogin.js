import React, {useState} from 'react';
import {Row,Col,Card,CardTitle,CardText,Form,FormGroup,Button,Label,Input} from 'reactstrap';

export default function AppLogin(props) {
  const [password,setPassword]=useState('');
  const [telefono,setTelefono]=useState('');

  //Mira que
  const handleChange=(event)=>{
    if (event.target.name=="telefono"){
      setTelefono(event.target.value)
    }
    if (event.target.name=="password"){
      setPassword(event.target.value)
    }
  }
  //En caso de que esté vacío sale un mensaje
  const clicar=()=>{
    if (password==''||telefono==''){
      props.setInfo("NO PUEDE TENER CAMPOS VACÍOS")
      return;
    }
    props.userLogin(telefono,password)
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
               <Label  className="me-sm-2" for="exampleEmail">User id</Label>
               <Input
                 id="Telefono"
                 name="telefono"
                 placeholder="type your user id"
                 type="email"
                 onChange={handleChange}
               />
             </FormGroup>
             <FormGroup className="mb-2 me-sm-2 mb-sm-0">
               <Label className="me-sm-2" for="examplePassword">Password</Label>
               <Input
                 id="Password"
                 name="password"
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
/*import {Button, Card, CardText, CardTitle, Form, FormGroup, Input} from "reactstrap";
import {useState} from "react";

function Login(props) {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");

    const handleClick = () => {
        props.f(usuario, clave);
    }

    const correcto = props.correcto ? <></> : <span >Usuario o contraseña no válidos</span>
    const error = !props.error ? <></> : <span >Ha ocurrido un error</span>

    return (<div>
        <Card
        body
        style={{width: "18rem", flex: "0 18rem"}}
        >
            <CardTitle className="text-center" tag="h4">Iniciar sesión</CardTitle>
            {correcto}
            {error}
            <CardText>
                <Form>
                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Input type="text" placeholder="Nombre de usuario" disabled={props.error}
                               onChange={event => setUsuario(event.target.value)}/>
                    </FormGroup>

                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Input type="password" placeholder="Contraseña" disabled={props.error}
                               onChange={event => setClave(event.target.value)}/>
                    </FormGroup>
                </Form>
            </CardText>
            <Button onClick={handleClick} disabled={props.error}>Iniciar sesión</Button>
        </Card>
    </div>);
}

export default Login;*/