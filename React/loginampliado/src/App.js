import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./componentes/Menu";
import AppLogin from "./componentes/AppLogin";
import Titulo from "./componentes/Titulo";
import Uno from "./componentes/Uno";
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
    };
  }

  changeMenu(item) {
    this.setState({ menuItem: item });
  }

  //El logueo
  userLogin(telefono, password) {
    axios
      .post(
        PHPLOGIN,
        JSON.stringify({
          telefono: telefono,
          password: md5(password),//md5 para la contraseña
        })
      )
      .then((res) => {
        //En caso de que el mensaje sea positivo entra
        if (res.data.mensaje == "Acceso correcto") {
          //Cambia el logueado a true
          this.setState({ logged: true });
        } else {
          //En caso negativo indica que hay un error
          this.setState({ info: "Ups, hubo un error" });
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
          userLogin={(telefono, password) => this.userLogin(telefono, password)}
          info={this.state.info}
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
      obj.push(<Titulo titulo={this.state.titulo} />);
      if (this.state.menuItem === "UNO")
        obj.push(<Uno setTitulo={(t) => this.setTitulo(t)} />);
      if (this.state.menuItem === "DOS")
        obj.push(<Dos setTitulo={(t) => this.setTitulo(t)} />);
      if (this.state.menuItem === "TRES")
        obj.push(<Tres setTitulo={(t) => this.setTitulo(t)} />);
    }
    return <div className="App">{obj}</div>;
  }
}

export default App;
