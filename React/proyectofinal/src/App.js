import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./componentes/Menu";
import AppLogin from "./componentes/AppLogin";
import Titulo from "./componentes/Titulo";
import Barraquita from "./componentes/Barraquita";
import Dos from "./componentes/Dos";
import Tres from "./componentes/Tres";
import { PHPLOGIN } from "./componentes/Datos";
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
      nombreUsuario:"",
      rolUsuario:0,
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
          clave: md5(clave),//md5 para la contraseña
        })
      )
      .then((res) => {
        //En caso de que el mensaje sea positivo entra
        if (res.data.mensaje == "Acceso correcto") {
          //Cambia el logueado a true
          this.setState({ logged: true });
          this.setState({nombreUsuario:res.data.nombre});
          this.setState({rolUsuario:res.data.admin});
        } else {
          //En caso negativo indica que hay un error
          this.setState({ info: "Ups, hubo un error" });
          this.setState({nombreUsuario:res.data.nombre});
          this.setState({rolUsuario:res.data.admin});
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
      //Si está logueado aparecen ya los menus de 1,2,3
    } else {
      obj.push(
        <Menu
          menuItem={this.state.menuItem}
          changeMenu={(item) => this.changeMenu(item)}
        />
      );
      //Tengo dos opciones aquí, o filtrar por nombre de usuario o por rol
      obj.push(<Titulo titulo={this.state.titulo} />);
      if (this.state.rolUsuario === 0)
        obj.push(<Barraquita setTitulo={(t) => this.setTitulo(t)} />);
        if (this.state.rolUsuario === 1)
        obj.push(<Dos setTitulo={(t) => this.setTitulo(t)} />);
    }
    return <div className="App">{obj}</div>;
  }
}

export default App;
