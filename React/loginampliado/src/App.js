/*import { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Menu';
import AppLogin from './componentes/AppLogin';
import {PHPLOGIN} from './componentes/Datos'
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      menuItem:undefined,
      info:"",
      logged:false,
    }
  }

  changeMenu(item){
    this.setState({menuItem:item})
  }

  userLogin(telefono,password){
    //console.log(telefono+" "+password)
    axios.post(PHPLOGIN,JSON.stringify({
      telefono:telefono,
      password:password
    })).then( res=>{
        if(res.data.usuario!==undefined){
          this.setState({logged:true})
        }
        this.setState({info:res.data.mensaje})

      }
    );
    //this.setState({info:"USUARIO O PASSWORD NO VÁLIDA"})
  }
  setInfo(i){
    this.setState({info:i})
  }

  render(){
    let obj=[];
    if (!this.state.logged){
      obj.push(
        <AppLogin setInfo={(i)=>this.setInfo(i)} userLogin={(telefono,password)=>this.userLogin(telefono,password)} info={this.state.info}/>
        )
    }else{
      obj.push(        
        <Menu menuItem={this.state.menuItem} changeMenu={(item)=>this.changeMenu(item)}/>
      )
    }
    return (
      <div className="App">
        {obj}
      </div>
    );
    }
}

export default App;*/
/*import { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Menu';
import AppLogin from './componentes/AppLogin';
import {PHPLOGIN} from './componentes/Datos'
import axios from 'axios';
import {useState} from "react";

function App() {
    const [activa, setActiva] = useState(false);
    const [correcto, setCorrecto] = useState(true);
    const [error, setError] = useState(false);

    function comprobar(usuario, clave) {
        axios.post(PHPLOGIN, JSON.stringify({usuario: usuario, clave: clave})).then(r => {
            if (r.data.mensaje === "Acceso correcto") {
                setActiva(true);
                setCorrecto(true);
                setError(false);
            }
            if (r.data.mensaje === "Acceso denegado") {
                setCorrecto(false);
                setError(false);
            }
            else {
                setError(true)
            }
        });
    }

    const obj = activa ? <Menu/> : <AppLogin error={error} correcto={correcto} f={comprobar}/>
    return (<>
            {obj}
        </>)
}

export default App;*/
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Menu';
import AppLogin from './componentes/AppLogin';
import {PHPLOGIN} from './componentes/Datos'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuItem: "DOS",
      //logged:false,

    }
  }

  changeMenu(item) {
    this.setState({ menuItem: item })
  }

  /*userLogin(telefono, password) {
    console.log(telefono + " " + password)
    axios.post(PHPLOGIN, JSON.stringify({
      telefono: telefono,
      password: password
    })).then(res => {
      if (res.data.usuario != undefined) {
        this.setState({ logged: true })
      }
      this.setState({ info: res.data.mensaje })
    }
    );
  }

  setInfo(i) {
    this.setState({ info: i })
  }*/

  setTitulo(boton, t) {
    let copia = this.state.titulo;
    copia[boton] = t;
    this.setState({ titulo: copia });
  }

  //Método que comprueba 
  userLogin(telefono, password) {
    axios.post(PHPLOGIN,
      JSON.stringify({
        telefono: telefono,
        password: password
      })
    ).then(res => {
      if (res.data.usuario != undefined) {
        //Se conecta:
        this.setState({ logged: true })
      }
      this.setState({ info: res.data.mensaje })
    }
    )
  }

  setInfo(i) {

    this.setState({ info: i })
  }
  //Al poner las funciones como flecha se auto-bindean
  render() {
    return (
      <div className="App">
        <Menu menuItem={this.state.menuItem} changeMenu={(item) => this.changeMenu(item)} />
        <AppLogin usuarioLogin={(telefono, password)=>this.userLogin(telefono,password)}></AppLogin>
      </div>
    );
  }
}

export default App;
