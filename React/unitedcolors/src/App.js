import { Button } from "reactstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
//Tenemos que crear el boton por un lado y la matriz rellena de estos por otro
class Boton extends Component {
    render() {
        return (
            <Button
                onClick={this.props.onClick}
                color={this.props.color}
            >
            </Button>
        );
    }
}

class Botones extends Component {
    constructor(props) {
        super(props);

        //Propiedades
        const columna = props.columna;
        const filas = props.filas;
        const colores = [
          "secondary","success","info","danger"
        ];
        const colorStandar = "primary";
        
        //Creamos la matriz y la rellenamos del color predeterminado
            const matriz = Array(filas)
            .fill()
            .map(() => Array(columna).fill(colorStandar));

        this.state = {
            matriz: matriz,
            columna: columna,
            filas: filas,
            colorStandar: colorStandar,
            colores: colores,
        };

    }

    //Método el cual mira las de alrededor y unifica el color
    cambioColor(matriz, i, j, color) {
        const {filas, columna, colorStandar} = this.state;
        if (i > 0) {
            if (matriz[i - 1][j] !== color && matriz[i - 1][j] !== colorStandar) {
                matriz[i - 1][j] = color;
                matriz = this.cambioColor(matriz, i - 1, j, color);
            }
        }

        if (i < filas - 1) {
            if (matriz[i + 1][j] !== color && matriz[i + 1][j] !== colorStandar) {
                matriz[i + 1][j] = color;
                matriz = this.cambioColor(matriz, i + 1, j, color);
            }
        }

        if (j > 0) {
            if (matriz[i][j - 1] !== color && matriz[i][j - 1] !== colorStandar) {
                matriz[i][j - 1] = color;
                matriz = this.cambioColor(matriz, i, j - 1, color);
            }
        }

        if (j < columna - 1) {
            if (matriz[i][j + 1] !== color && matriz[i][j + 1] !== colorStandar) {
                matriz[i][j + 1] = color;
                matriz = this.cambioColor(matriz, i, j + 1, color);
            }
        }
        return matriz;
    }

  //Método el cual nos indica qué hace el código cuando hacemos click sobre algo(En este caso los botones)
  handleClick(posicionY, posicionX) {
    const { matriz, columna, filas, colorStandar, colores } = this.state;
    const matrizFinal = matriz.map((fila, i) => {
      return fila.map((color, j) => {
        if (i === posicionX && j === posicionY) {
          if (color !== "primary") {
            return colorStandar;
          }
          if (i > 0 && matriz[i - 1][j] !== colorStandar) {
            return matriz[i - 1][j];
          }
          if (i < filas - 1 && matriz[i + 1][j] !== colorStandar) {
            return matriz[i + 1][j];
          }
          if (j > 0 && matriz[i][j - 1] !== colorStandar) {
            return matriz[i][j - 1];
          }
          if (j < columna - 1 && matriz[i][j + 1] !== colorStandar) {
            return matriz[i][j + 1];
          }
          let colorAleatorio=colores[
            Math.floor(Math.random() * colores.length)
            ];
          return colorAleatorio;
        } else {
          return color;
        }
      });
    });
    //Para que cuando le damos de nuevo a un botón únicamente ese botón de ponga del color standar
    if(matrizFinal[posicionX][posicionY]===colorStandar){
      this.setState({ matriz: matrizFinal });
      return;
    }
    //Llamamos al método para que nos cambie el color
    this.cambioColor(matrizFinal, posicionX , posicionY, matrizFinal[posicionX][posicionY]);
    
    //Cambiamos la matriz por la nueva con los colores cambiados
    this.setState({ matriz: matrizFinal });}

render() {
      const {matriz, colores} = this.state;

      const filas = matriz.map((fila, i) => {
          const botones = fila.map((color, j) => {
              return (
                  <Boton
                      key={j}
                      color={color}
                      onClick={() => this.handleClick(j, i)}
                  />
              );
          });

          return <div key={i}>{botones}</div>;
      });

      const botonesColores = colores.map((color, i) => {
          return (
              <Boton
                  key={i}
                  color={color}
                  onClick={() => this.setState({colorStandar: color})}
              />
          );
      });

      return (
          <div>
              <div>{filas}</div>
              <div>Leyenda : {botonesColores}</div>
          </div>
      );
  }
}
function App() {
  return (
    <div>
      <h1>Matriz de colores</h1>
      <Botones columna={10} filas={10} />
    </div>
  );
}
export default App;

