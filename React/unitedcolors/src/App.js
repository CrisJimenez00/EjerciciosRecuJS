import { Button } from "reactstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";

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

        const cols = props.cols;
        const rows = props.rows;
        const posiblesColores = [
          "secondary","success","info","danger"
        ];
        const colorDefault = "primary";
        

        const matriz = Array(rows)
            .fill()
            .map(() => Array(cols).fill(colorDefault));

        this.state = {
            matriz: matriz,
            cols: cols,
            rows: rows,
            colorDefault: colorDefault,
            posiblesColores: posiblesColores,
        };

        this.cambioColor = this.cambioColor.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    cambioColor(matriz, i, j, color) {
        const {rows, cols, colorDefault} = this.state;

        if (i > 0) {
            if (matriz[i - 1][j] !== color && matriz[i - 1][j] !== colorDefault) {
                matriz[i - 1][j] = color;
                matriz = this.cambioColor(matriz, i - 1, j, color);
            }
        }

        if (i < rows - 1) {
            if (matriz[i + 1][j] !== color && matriz[i + 1][j] !== colorDefault) {
                matriz[i + 1][j] = color;
                matriz = this.cambioColor(matriz, i + 1, j, color);
            }
        }

        if (j > 0) {
            if (matriz[i][j - 1] !== color && matriz[i][j - 1] !== colorDefault) {
                matriz[i][j - 1] = color;
                matriz = this.cambioColor(matriz, i, j - 1, color);
            }
        }

        if (j < cols - 1) {
            if (matriz[i][j + 1] !== color && matriz[i][j + 1] !== colorDefault) {
                matriz[i][j + 1] = color;
                matriz = this.cambioColor(matriz, i, j + 1, color);
            }
        }

        return matriz;
    }

  
  handleClick(posx, posy) {
    const { matriz, cols, rows, colorDefault, posiblesColores } = this.state;
    let ultimoBotonPresionado = 0; // se define la variable
  
    const nuevaMatriz = matriz.map((fila, i) => {
      return fila.map((color, j) => {
        if (i === posy && j === posx) {
          if (color !== "primary") {
            return colorDefault;
          }
          if (i > 0 && matriz[i - 1][j] !== colorDefault) {
            ultimoBotonPresionado = matriz[i - 1][j];
            return matriz[i - 1][j];
          }
          if (i < rows - 1 && matriz[i + 1][j] !== colorDefault) {
            ultimoBotonPresionado = matriz[i + 1][j];
            return matriz[i + 1][j];
          }
          if (j > 0 && matriz[i][j - 1] !== colorDefault) {
            ultimoBotonPresionado = matriz[i][j - 1];
            return matriz[i][j - 1];
          }
          if (j < cols - 1 && matriz[i][j + 1] !== colorDefault) {
            ultimoBotonPresionado = matriz[i][j + 1];
            return matriz[i][j + 1];
          }
          let posiblesColoresSinUltimo = posiblesColores.filter((color) => color !== ultimoBotonPresionado);
          if (posiblesColoresSinUltimo.length === 0) {
            posiblesColoresSinUltimo = posiblesColores;
          }
          const indice = Math.floor(Math.random() * posiblesColoresSinUltimo.length);
          ultimoBotonPresionado = posiblesColoresSinUltimo[indice];
          return posiblesColoresSinUltimo[indice];
        } else {
          return color;
        }
      });
    });
    
    this.setState({ matriz: nuevaMatriz, ultimoBotonPresionado });}
/*HAY QUE HACER QUE SI SE UNEN DOS GRUPOS SE UNIFIQUEN EN UN MISMO COLOR */

render() {
      const {matriz, posiblesColores} = this.state;

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

      const botonesColores = posiblesColores.map((color, i) => {
          return (
              <Boton
                  key={i}
                  color={color}
                  onClick={() => this.setState({colorDefault: color})}
              />
          );
      });

      return (
          <div>
              <div>{filas}</div>
              <div>{botonesColores}</div>
          </div>
      );
  }
}
function App() {
  return (
    <div>
      <h1>Matriz de colores</h1>
      <Botones cols={10} rows={10} />
    </div>
  );
}
export default App;

