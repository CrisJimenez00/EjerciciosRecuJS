import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuAdmin from "./componentes/MenuAdmin";
import MenuUsuario from "./componentes/MenuUsuario";
import AppLogin from "./componentes/AppLogin";
import Pantallas from "./componentes/Pantallas";
import Anuncios from "./componentes/Anuncios";
import {
  PHPLOGIN,
  PHPINSERT,
  PHPLISTAR,
  PHPBORRAR,
  PHPANUNCIOLISTAR,
  PHPANUNCIOINSERT,
} from "./componentes/Datos";

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
      idUsuario: "",
      listaUsuarios: [],
      listaUsuariosAnuncios: [],
    };
  }

  changeMenu(item) {
    this.setState({ menuItem: item });
  }
  componentDidMount() {
    this.userListar();
    this.userListarAnuncio(this.state.idUsuario);
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
        if (res.data.mensaje == "Acceso correcto") {
          //Cambia el logueado a true
          this.setState({ logged: true });
          this.setState({ nombreUsuario: res.data.nombre });
          this.setState({ rolUsuario: res.data.admin });
          this.setState({idUsuario:res.data.id_cliente});
        } else {
          //En caso negativo indica que hay un error
          this.setState({ info: "Ups, hubo un error" });
        }
      });
  }
  //Borrar
  userDelete(idUsuario) {
    axios.delete(PHPBORRAR, { data: { id_cliente: idUsuario } }).then((res) => {
      setTimeout(() => {
        this.userListar();
      }, 100);
    });
  }
  //Listar
  userListar = async () => {
    axios.get(PHPLISTAR).then((res) => {
      //En caso de que el mensaje sea positivo entra
      const usuario = res.data.listaUsuarios;
      //console.log(res);
      this.setState({ listaUsuarios: usuario });
    });
  };

  userListarAnuncio = async (idUsuario) => {
    try {
      const response = await axios.post(PHPANUNCIOLISTAR, {
        idUsuario: idUsuario,
      });
      const listaAnuncios = response.data.listaAnuncios;
  
      // Ordenar la lista de anuncios según el campo "orden"
      listaAnuncios.sort((a, b) => a.orden - b.orden);
  
      this.setState({ listaUsuariosAnuncios: listaAnuncios });
      this.setState({ info: "" });
    } catch (error) {
      console.error(error);
    }
  };
  
  //Para actualizar la lista
  actualizarListaAnuncios = async (idUsuario) => {
    try {
      await this.userListarAnuncio(idUsuario);
    } catch (error) {
      console.error(error);
    }
  };

  //Insertar
  anuncioInsert(nombre, imagen, tiempo, id_cliente) {
    // Obtener el último anuncio subido por el usuario
    const ultimoAnuncio =
      this.state.listaUsuariosAnuncios[
        this.state.listaUsuariosAnuncios.length - 1
      ];
    const orden = ultimoAnuncio ? ultimoAnuncio.orden + 1 : 1;

    axios
      .post(
        PHPANUNCIOINSERT,
        JSON.stringify({
          orden: orden,
          imagen: imagen,
          tiempo: tiempo,
          id_cliente: id_cliente,
        })
      )
      .then((res) => {
        //En caso de que el mensaje sea positivo entra
        if (res.data.mensaje === "hecho") {
          //Cambia el logueado a true
          this.setState({ info: "El anuncio se ha insertado correctamente" });
          // Actualizar la lista de anuncios después de un tiempo específico
          setTimeout(() => {
            this.actualizarListaAnuncios(id_cliente);
            this.setState({ info:""});
          }, 1000);
        } else {
          //En caso negativo indica que hay un error
          this.setState({ info: "No se pudo insertar correctamente" });
        }
      });
  }

  userInsert(nombre, usuario, clave) {
    axios
      .post(
        PHPINSERT,
        JSON.stringify({
          nombre: nombre,
          usuario: usuario,
          clave: md5(clave),
        })
      )
      .then((res) => {
        //En caso de que el mensaje sea positivo entra
        if (res.data.mensaje == "hecho") {
          //Cambia el logueado a  true
          this.setState({ info: "El usuario se ha insertado correctamente" });
          setTimeout(() => {
            this.userListar();
            this.setState({ info:""});
          }, 100);
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
      if (this.state.menuItem === "PANTALLAS") {
        obj.push(
          <Pantallas
            setInfo={(i) => this.setInfo(i)}
            info={this.state.info}
            userInsert={(nombre, usuario, clave) =>
              this.userInsert(nombre, usuario, clave)
            }
            listaUsuarios={this.state.listaUsuarios}
            userDelete={(x) => this.userDelete(x)}
            nombreUsuario={this.state.nombreUsuario}
            idUsuario={this.state.idUsuario}
          ></Pantallas>
        );
      } else if (this.state.menuItem === "ANUNCIOS") {
        obj.push(
          <Anuncios
            setInfo={(i) => this.setInfo(i)}
            info={this.state.info}
            anuncioInsert={(orden, imagen, tiempo, id_cliente) =>
              this.anuncioInsert(orden, imagen, tiempo, id_cliente)
            }
            listaUsuarios={this.state.listaUsuarios}
            userListarAnuncio={this.userListarAnuncio}
            listaAnuncios={this.state.listaUsuariosAnuncios}
          />
        );
      }
      if (this.state.rolUsuario === 0) {
        obj.push(
          <MenuUsuario
            idUsuario={this.state.idUsuario}
            listaAnuncios={this.state.listaUsuariosAnuncios}
            changeMenu={this.changeMenu}
            userListarAnuncio={this.userListarAnuncio}
          />
        );
      }
    }
    return <div className="App">{obj}</div>;
  }
}

export default App;
