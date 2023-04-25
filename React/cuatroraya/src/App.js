/*import React, { Component } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Boton extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        className={this.props.value}
        style={{ color: "white", width: "50px", height: "40px", margin: "2px" }}
      >
        {this.props.value}
      </Button>
    );
  }
}

class Tablero extends Component {
  render() {
    return (
      <div>
        <div className="fila-tablero">
          <Boton
            value={this.props.tablero[0]}
            onClick={() => this.props.onClick(0)}
          />
          <Boton
            value={this.props.tablero[1]}
            onClick={() => this.props.onClick(1)}
          />
          <Boton
            value={this.props.tablero[2]}
            onClick={() => this.props.onClick(2)}
          />
          <Boton
            value={this.props.tablero[3]}
            onClick={() => this.props.onClick(3)}
          />
        </div>
        <div className="fila-tablero">
          <Boton
            value={this.props.tablero[4]}
            onClick={() => this.props.onClick(4)}
          />
          <Boton
            value={this.props.tablero[5]}
            onClick={() => this.props.onClick(5)}
          />
          <Boton
            value={this.props.tablero[6]}
            onClick={() => this.props.onClick(6)}
          />
          <Boton
            value={this.props.tablero[7]}
            onClick={() => this.props.onClick(7)}
          />
        </div>
        <div className="fila-tablero">
          <Boton
            value={this.props.tablero[8]}
            onClick={() => this.props.onClick(8)}
          />
          <Boton
            value={this.props.tablero[9]}
            onClick={() => this.props.onClick(9)}
          />
          <Boton
            value={this.props.tablero[10]}
            onClick={() => this.props.onClick(10)}
          />
          <Boton
            value={this.props.tablero[11]}
            onClick={() => this.props.onClick(11)}
          />
        </div>
        <div className="fila-tablero">
          <Boton
            value={this.props.tablero[12]}
            onClick={() => this.props.onClick(12)}
          />
          <Boton
            value={this.props.tablero[13]}
            onClick={() => this.props.onClick(13)}
          />
          <Boton
            value={this.props.tablero[14]}
            onClick={() => this.props.onClick(14)}
          />
          <Boton
            value={this.props.tablero[15]}
            onClick={() => this.props.onClick(15)}
          />
        </div>
      </div>
    );
  }
}

class Juego extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablero: Array(16).fill(null),
      jugador1: true,
      ganador: null,
    };
  }

  handleClick(i) {
    const tablero = this.state.tablero.slice();
    if (this.state.ganador || tablero[i]) {
      return;
    }
    tablero[i] = this.state.jugador1 ? "X" : "O";
    this.setState({
      tablero: tablero,
      jugador1: !this.state.jugador1,
      ganador: this.calcularGanador(tablero),
    });
  }

  calcularGanador(tablero) {
    const combinacionesGanadoras = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
      const [a, b, c, d] = combinacionesGanadoras[i];
      if (
        tablero[a] &&
        tablero[a] === tablero[b] &&
        tablero[a] === tablero[c] &&
        tablero[a] === tablero[d]
      ) {
        return tablero[a];
      }
    }
    return null;
  }

  reiniciar() {
    this.setState({
      tablero: Array(16).fill(null),
      jugador1: true,
      ganador: null,
    });
  }

  render() {
    const ganador = this.state.ganador;
    let status;
    if (ganador) {
      status = "Ganador: " + ganador;
    } else {
      status = "Turno de: " + (this.state.jugador1 ? "X" : "O");
    }
    return (
      <div className="juego">
        <div className="tablero-container">
          <Tablero
            tablero={this.state.tablero}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="status">{status}</div>
        <div className="boton-container">
          {ganador && (
            <Button
              className="reiniciar-boton"
              onClick={() => this.reiniciar()}
            >
              Reiniciar
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Juego;*/
import React, { Component } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MapaBotones = (props) => {
  let listaBotones = props.listaBotones;
  return (
    <div>
      {listaBotones.map((fila, x) => {
        return (
          <div >
            {fila.map((boton, y) => {
              if (boton !== "secondary") {
                return (
                  <Button
                    onClick={() => props.onClick(x, y)}
                    color={boton}
                  ></Button>
                );
              } else {
                return (
                  <Button
                    onClick={() => props.onClick(x, y)}
                    color={boton}
                    outline
                  ></Button>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: Array(9).fill(null),
      turno: false,
      ganaAzul: false,
      ganaRojo: false,
    };
  }

  reset() {
    let listaBotones = [...this.state.listaBotones];
    listaBotones = listaBotones.map((fila) => {
      return Array(9).fill("secondary");
    });
    this.setState({ listaBotones: listaBotones });
    this.setState({ turno: false });
    this.setState({ ganaAzul: false });
    this.setState({ ganaRojo: false });
  }

  buscarGanador() {
    let listaBotones = [...this.state.listaBotones];

    // Filas
    listaBotones.forEach((fila) => {
      let azules = 0;
      let rojas = 0;
      //Si el botón es azul el jugador con azul suma 1 y las rojas se vuelve a 0
      fila.forEach((boton) => {
        if (boton === "info") {
          azules++;
          rojas = 0;
          //Si el botón es rojo el jugador suma 1 y azul se vueleve a 0
        } else if (boton === "danger") {
          rojas++;
          azules = 0;
        } else {
          azules = 0;
          rojas = 0;
        }
        //El que llegue antes a 4 gana
        if (azules === 4) {
          this.setState({ ganaAzul: true });
          return;
        }
        if (rojas === 4) {
          this.setState({ ganaRojo: true });
        }
      });
    });

    // Columnas
    for (let i = 0; i < listaBotones.length; i++) {
      let azules = 0;
      let rojas = 0;
      for (let j = 0; j < listaBotones.length; j++) {
        if (listaBotones[j][i] === "info") {
          azules++;
          rojas = 0;
        } else if (listaBotones[j][i] === "danger") {
          rojas++;
          azules = 0;
        } else {
          azules = 0;
          rojas = 0;
        }
        if (azules === 4) {
          this.setState({ ganaAzul: true });
          return;
        }
        if (rojas === 4) {
          this.setState({ ganaRojo: true });
          return;
        }
      }
    }
  }

  partida(x, y) {
    if (this.state.ganaAzul || this.state.ganaRojo) {
      this.reset();
      return;
    }

    let listaBotones = [...this.state.listaBotones];

    for (let i = listaBotones.length - 1; i >= 0; i--) {
      if (listaBotones[i][y] !== "danger" && listaBotones[i][y] !== "info") {
        if (this.state.turno) {
          listaBotones[i][y] = "danger";
        } else {
          listaBotones[i][y] = "info";
        }
        break;
      }
    }

    this.setState({ turno: !this.state.turno });
    this.setState({ listaBotones: listaBotones });

    this.buscarGanador();
  }

  componentWillMount() {
    this.reset();
  }

  render() {
    return (
      <div className="App">
        <h1> CUATRO EN RAYA </h1>
        <h2> Turno: {this.state.turno ? "Rojo" : "Azul"} </h2>
        <h2> {this.state.ganaAzul ? "Ha ganado el jugador Azul" : ""} </h2>
        <h2> {this.state.ganaRojo ? "Ha ganado el jugador Rojo" : ""} </h2>
        <MapaBotones
          listaBotones={this.state.listaBotones}
          onClick={(x, y) => this.partida(x, y)}
        />
      </div>
    );
  }
}

export default App;
