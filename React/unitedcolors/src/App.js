import { Button } from "reactstrap";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MapaBotones = (props) => {
  let lista = [];
  for (let i = 0; i < props.listaBotones.length; i++) {
    let lista2 = [];
    for (let j = 0; j < props.listaBotones.length; j++) {
      lista2.push(
        <Button
          key={i * 10 + j}
          color={props.listaBotones[i][j].color}
          onClick={() => props.clica(i, j)}
        />
      );
    }
    lista.push(
      <>
        {lista2}
        <br />
      </>
    );
  }
  return <>{lista}</>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: Array(9).fill(null),
      listaColores: ["primary", "secondary", "success", "warning", "danger"],
    };
    this.carga();
  }

  carga() {
    let l = this.state.listaBotones;
    for (let i = 0; i < l.length; i++) {
      let aux = [];
      for (let j = 0; j < l.length; j++) {
        aux.push({ color: "info", pulsado: false });
      }
      l[i] = aux;
    }
    this.setState({ listaBotones: l });
  }

  clica(x, y) {
    let l = this.state.listaBotones;
    l[x][y].pulsado = true;
    this.setState({ listaBotones: l });
    console.log(l);
  }

  render() {
    return (
      <>
        <MapaBotones
          listaBotones={this.state.listaBotones}
          clica={(x, y) => this.clica(x, y)}
        />
      </>
    );
  }
}

export default App;
