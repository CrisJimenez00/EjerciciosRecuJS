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
      ultimosColores: [],
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

  cambiaColor(x, y) {
    const l = this.state.listaBotones;
    const button = l[x][y];
  
    let color = button.color;
  
    // Comprueba si el color ya ha sido seleccionado y el botón actual no es adyacente a un botón ya seleccionado
    const selectedColors = new Set(l.flatMap(row => row.filter(b => b.pulsado).map(b => b.color)));
    if (selectedColors.has(color) && !l.some((row, i) => (
      (i === x - 1 && row[y].pulsado) ||
      (i === x + 1 && row[y].pulsado) ||
      (row[y - 1]?.pulsado) ||
      (row[y + 1]?.pulsado)
    ))) {
      const colorIndex = this.state.listaColores.indexOf(color);
      if (colorIndex !== -1) {
        color = this.state.listaColores[(colorIndex + 1) % this.state.listaColores.length];
      }
    }
  
    let hayAdyacentePulsado = false;
    if (x > 0 && l[x - 1][y].pulsado) {
      hayAdyacentePulsado = true;
      color = l[x - 1][y].color;
    }
    if (x < l.length - 1 && l[x + 1][y].pulsado) {
      hayAdyacentePulsado = true;
      color = l[x + 1][y].color;
    }
    if (y > 0 && l[x][y - 1].pulsado) {
      hayAdyacentePulsado = true;
      color = l[x][y - 1].color;
    }
    if (y < l.length - 1 && l[x][y + 1].pulsado) {
      hayAdyacentePulsado = true;
      color = l[x][y + 1].color;
    }
    if (hayAdyacentePulsado) {
      l[x][y].color = color;
    }
    this.setState({ listaBotones: l });
  }
  clica(x, y) {
    let l = this.state.listaBotones;
    let button = l[x][y];
  
    if (button.pulsado) {
      // Si el botón ya está pulsado, verificar cuántas veces ha sido pulsado antes
      let index = this.state.listaColores.indexOf(button.color);
      if (index === -1) {
        // Si es -1, entonces el botón ya estaba en el color predefinido
        button.color = this.state.ultimosColores[this.state.ultimosColores.length - 1] || "info";
        // Si no hay ningún color en la lista de últimos colores, establece el color predefinido
      } else if (button.vecesPulsado === 1) {
        // Si es 1, establece el color predefinido
        button.color = "info";
      } else {
        // Si es mayor que 1, establece el siguiente color en la lista
        button.color = this.state.listaColores[(index + 1) % this.state.listaColores.length];
      }
      // Reinicia el contador de veces pulsado del botón
      button.vecesPulsado = 0;
    } else {
      // Si el botón no está pulsado, establece el primer color en la lista
      button.color = this.state.listaColores[0];
    }
    
    button.pulsado = !button.pulsado;
    button.vecesPulsado = (button.vecesPulsado || 0) + 1;
    this.setState(prevState => ({ ultimosColores: [...prevState.ultimosColores, button.color] }));
    this.setState({ listaBotones: l });
    this.cambiaColor(x, y);
  }
  cambiaColor(x, y) {
  const l = this.state.listaBotones;
  const button = l[x][y];

  let color = button.color;

  // Comprueba si el color ya ha sido seleccionado y el botón actual no es adyacente a un botón ya seleccionado
  const selectedColors = new Set(l.flatMap(row => row.filter(b => b.pulsado).map(b => b.color)));
  if (selectedColors.has(color) && !l.some((row, i) => (
    (i === x - 1 && row[y].pulsado) ||
    (i === x + 1 && row[y].pulsado) ||
    (row[y - 1]?.pulsado) ||
    (row[y + 1]?.pulsado)
  ))) {
    const colorIndex = this.state.listaColores.indexOf(color);
    if (colorIndex !== -1) {
      color = this.state.listaColores[(colorIndex + 1) % this.state.listaColores.length];
    }
  }

  let hayAdyacentePulsado = false;
  if (x > 0 && l[x - 1][y].pulsado) {
    hayAdyacentePulsado = true;
    color = l[x - 1][y].color;
  }
  if (x < l.length - 1 && l[x + 1][y].pulsado) {
    hayAdyacentePulsado = true;
    color = l[x + 1][y].color;
  }
  if (y > 0 && l[x][y - 1].pulsado) {
    hayAdyacentePulsado = true;
    color = l[x][y - 1].color;
  }
  if (y < l.length - 1 && l[x][y + 1].pulsado) {
    hayAdyacentePulsado = true;
    color = l[x][y + 1].color;
  }
  if (hayAdyacentePulsado) {
    l[x][y].color = color;
  }
  this.setState({ listaBotones: l });
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
  