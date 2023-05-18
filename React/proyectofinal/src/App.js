import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuAdmin from "./componentes/MenuAdmin";
import MenuUsuario from "./componentes/MenuUsuario";
import AppLogin from "./componentes/AppLogin";
import Pantallas from "./componentes/Pantallas";
import Anuncios from "./componentes/Anuncios";
import { PHPLOGIN,PHPINSERT, PHPLISTAR } from "./componentes/Datos";

import axios from "axios";
import md5 from "md5";

class App extends Component {
  //Atributos
  constructor(props) {
    super(props);
    this.state = {
      menuItem: undefined,
      logged: false,
      info: "",
      titulo: "",
      nombreUsuario: "",
      rolUsuario: 0,
      idUsuario:'',
      listaUsuarios:""
    };
  }

  changeMenu(item) {
    this.setState({ menuItem: item });
  }

  //El logueo
  userLogin(usuario, clave) {
    axios
      .post(
        PHPLOGIN,
        JSON.stringify({
          usuario: usuario,
          clave: md5(clave), //md5 para la contraseña
        })
      )
      .then((res) => {
        //En caso de que el mensaje sea positivo entra
        console.log(res);
        if (res.data.mensaje == "Acceso correcto") {
          //Cambia el logueado a true
          this.setState({ logged: true });
          this.setState({ nombreUsuario: res.data.nombre });
          this.setState({ rolUsuario: res.data.admin });
        } else {
          //En caso negativo indica que hay un error
          this.setState({ info: "Ups, hubo un error" });
        }
      });
  }
  //Listar
  userListar(){
    axios
      .get(
        PHPLISTAR
      )
      .then((res) => {
        //En caso de que el mensaje sea positivo entra
        console.log(res);
        if (res.data.mensaje == "Acceso correcto") {
          this.setState({idUsuario:res.data.idUsuario});
          this.setState({ nombreUsuario: res.data.nombre });
          this.setState({ usuario: res.data.usuario });
          this.setState({listaUsuarios:res.data.listaUsuarios});
          //console.log(this.state.idUsuario+" " + this.state.nombreUsuario+" "+ this.state.usuario);
        
        } else {
          //En caso negativo indica que hay un error
          this.setState({ info: "Ups, hubo un error" });
        }
      });
  }
  userInsert(nombre, usuario, clave){
    axios
      .post(
        PHPINSERT,
        JSON.stringify({
          nombre:nombre,
          usuario:usuario,
          clave:md5(clave)
        })
      )
      .then((res) => {
        //En caso de que el mensaje sea positivo entra
        console.log(res);
        if (res.data.mensaje == "hecho") {
          //Cambia el logueado a true
          this.setState({ info:"El usuario se ha insertado correctamente"});
        } else {
          //En caso negativo indica que hay un error
          this.setState({ info: "No se pudo insertar correctamente" });
          
        }
      });
  }

  setInfo(i) {
    this.setState({ info: i });
  }
  setTitulo(t) {
    this.setState({ titulo: t });
  }

  //renderizamos
  render() {
    let obj = [];
    console.log(this.state.idUsuario);
    //Si no está logueado aparece el login

    if (!this.state.logged) {
      obj.push(
        <AppLogin
          setInfo={(i) => this.setInfo(i)}
          userLogin={(usuario, clave) => this.userLogin(usuario, clave)}
          info={this.state.info}
          nombreUsuario={this.state.nombreUsuario}
          rolUsuario={this.state.rolUsuario}
        />
      );
    } else {
      //Tengo dos opciones aquí, o filtrar por rol
      if (this.state.rolUsuario === 1)
        obj.push(
          <MenuAdmin
            menuItem={this.state.menuItem}
            changeMenu={(item) => this.changeMenu(item)}
          />
        );
        if(this.state.menuItem=="PANTALLAS"){
          obj.push(<Pantallas 
            setInfo={(i) => this.setInfo(i)}
            info={this.state.info}
            userInsert={(nombre,usuario, clave) => this.userInsert(nombre,usuario, clave)}
            userListar={() => this.userListar()}
            nombreUsuario={this.state.nombreUsuario}
            idUsuario={this.state.idUsuario}
            ></Pantallas>);
        }else if(this.state.menuItem=="ANUNCIOS"){
          obj.push(<Anuncios/>)
        }
      if (this.state.rolUsuario === 0){
        obj.push(
          <MenuUsuario
            menuItem={this.state.menuItem}
            changeMenu={(item) => this.changeMenu(item)}
          />
        );
        obj.push(
          <Anuncios></Anuncios>
        )
      }
    }
    return <div className="App">{obj}</div>;
  }
}

export default App;
