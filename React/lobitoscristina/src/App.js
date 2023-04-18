import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botones: [0, 0, 0, 0, 0],
    };
  }

  //Metodo el cual hace que el número que está en el botón aumente
  aumenta(posicion) {
    this.setState((x) => {
      //Hacemos una copia de la lista botones y la agregamos a una constante
      const botones = [...x.botones];
      botones[posicion]++;
      return { botones: botones };
    });
  }

  render() {
    //Buscamos el número mayor c
    const max = Math.max(...this.state.botones);
    return (
      <div className="App">
        <header className="App-header">
          <Boton
          //Miramos que el número sea el mayor y distinto de 0
            color={
              this.state.botones[0] === max && this.state.botones[0] != 0
                ? "primary"
                : "secondary"
            }
            //Llamamos al método anterior creado
            click={() => this.aumenta(0)}
            valor={this.state.botones[0]}
          />
          <Boton
            color={
              this.state.botones[1] === max && this.state.botones[1] != 0
                ? "primary"
                : "secondary"
            }
            click={() => this.aumenta(1)}
            valor={this.state.botones[1]}
          />
          <Boton
            color={
              this.state.botones[2] === max && this.state.botones[2] != 0
                ? "primary"
                : "secondary"
            }
            click={() => this.aumenta(2)}
            valor={this.state.botones[2]}
          />
          <Boton
            color={
              this.state.botones[3] === max && this.state.botones[3] != 0
                ? "primary"
                : "secondary"
            }
            click={() => this.aumenta(3)}
            valor={this.state.botones[3]}
          />
          <Boton
            color={
              this.state.botones[4] === max && this.state.botones[4] != 0
                ? "primary"
                : "secondary"
            }
            click={() => this.aumenta(4)}
            valor={this.state.botones[4]}
          />
        </header>
      </div>
    );
  }
}

function Boton(props) {
  return (
    <Button color={props.color} onClick={() => props.click()}>
      {props.valor}
    </Button>
  );
}

export default App;
