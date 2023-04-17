/*import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Creamos la lista de botones
      botones: [0, 0, 0, 0, 0],
      //Le ponemos un color de boton
      colores: ["Info", "Primary", "Primary", "Primary", "Primary"],
    };
  }

  //Metodo el cual hace que suba el valor del boton
  aumenta(posicion) {
    this.setState((x) => {
      //Creamos una copia de botones y lo metemos en una constante
      const numero = [...x.botones];
      //Cambiamos el valor
      numero[posicion]++;
      //Ejecutamos el cambio
      return { botones: numero };
    });
  }
  

  //Renderizamos
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Boton
            //color={this.state.colores[0]}
            click={() => this.aumenta(0)}
            valor={this.state.botones[0]}
          />
          <Boton click={() => this.aumenta(1)} valor={this.state.botones[1]} />
          <Boton click={() => this.aumenta(2)} valor={this.state.botones[2]} />
          <Boton click={() => this.aumenta(3)} valor={this.state.botones[3]} />
          <Boton click={() => this.aumenta(4)} valor={this.state.botones[4]} />
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

export default App;*/

/*class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Creamos la lista de botones
      botones: [0, 0, 0, 0, 0],
      // Le ponemos un color de boton
      colores: ["Info", "Primary", "Primary", "Primary", "Primary"],
    };
  }

  // Método el cual hace que suba el valor del boton
  aumenta(posicion) {
    this.setState((x) => {
      // Creamos una copia de botones y lo metemos en una constante
      const numero = [...x.botones];
      // Cambiamos el valor
      numero[posicion]++;
      // Ejecutamos el cambio
      return { botones: numero };
    });
  }

  // Función para calcular el valor máximo de los botones
  numeroMayor() {
    const max = Math.max(...this.state.botones);
    return max;
  }

  // Función para actualizar los colores de los botones
  cambioColor() {
    const max = this.numeroMayor();
    const colores = this.state.botones.map((valor) => {
      if (valor === max) {
        return "Primary";
      } else {
        return "Info";
      }
    });
    this.setState({ colores });
  }

  // Renderizamos
  render() {
    this.cambioColor();
    return (
      <div className="App">
        <header className="App-header">
          <Boton
            color={this.state.colores[0]}
            click={() => this.aumenta(0)}
            valor={this.state.botones[0]}
          />
          <Boton
            color={this.state.colores[1]}
            click={() => this.aumenta(1)}
            valor={this.state.botones[1]}
          />
          <Boton
            color={this.state.colores[2]}
            click={() => this.aumenta(2)}
            valor={this.state.botones[2]}
          />
          <Boton
            color={this.state.colores[3]}
            click={() => this.aumenta(3)}
            valor={this.state.botones[3]}
          />
          <Boton
            color={this.state.colores[4]}
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

export default App;*/

/*class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botones: [0, 0, 0, 0, 0],
      color: "primary"
    };
  }

  aumenta(posicion) {
    this.setState((x) => {
      const botones = [...x.botones];
      botones[posicion]++;
      const max = Math.max(...botones);
      const color = max > 1 ? "primary" : "info";
      return { botones: botones, color: color };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Boton color={this.state.color} click={() => this.aumenta(0)} valor={this.state.botones[0]} />
          <Boton color={this.state.color} click={() => this.aumenta(1)} valor={this.state.botones[1]} />
          <Boton color={this.state.color} click={() => this.aumenta(2)} valor={this.state.botones[2]} />
          <Boton color={this.state.color} click={() => this.aumenta(3)} valor={this.state.botones[3]} />
          <Boton color={this.state.color} click={() => this.aumenta(4)} valor={this.state.botones[4]} />
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

export default App;*/
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Creamos la lista de botones
      botones: [0, 0, 0, 0, 0],
      //Le ponemos un color de boton
      colores: ["Primary", "Primary", "Primary", "Primary", "Primary"],
      //Agregamos una variable para saber si se ha encontrado el máximo
      encontradoMaximo: false,
    };
  }

  //Metodo el cual hace que suba el valor del boton
  aumenta(posicion) {
    this.setState((x) => {
      //Creamos una copia de botones y lo metemos en una constante
      const numero = [...x.botones];
      //Cambiamos el valor
      numero[posicion]++;
      //Ejecutamos el cambio
      return { botones: numero };
    });
  }

  //Metodo para buscar el maximo valor
  buscarMaximo() {
    const maximo = Math.max(...this.state.botones);
    //Verificamos si hay empates
    const empates = this.state.botones.filter((x) => x === maximo).length;
    //Si solo hay un maximo
    if (empates === 1) {
      //Encontramos el indice del maximo valor
      const indiceMaximo = this.state.botones.findIndex((x) => x === maximo);
      //Creamos una copia de los colores y lo metemos en una constante
      const colores = [...this.state.colores];
      //Cambiamos el color del maximo valor a Primary
      colores[indiceMaximo] = "Primary";
      //Ejecutamos el cambio
      this.setState({ colores: colores, encontradoMaximo: true });
    } else {
      //Si hay mas de un maximo valor, seguimos usando los colores por defecto
      this.setState({ encontradoMaximo: false });
    }
  }

  //Renderizamos
  render() {
    //Buscamos el maximo valor antes de renderizar los botones
    if (!this.state.encontradoMaximo) {
      this.buscarMaximo();
    }
    return (
      <div className="App">
        <header className="App-header">
          <Boton
            color={this.state.colores[0]}
            click={() => this.aumenta(0)}
            valor={this.state.botones[0]}
          />
          <Boton
            color={this.state.colores[1]}
            click={() => this.aumenta(1)}
            valor={this.state.botones[1]}
          />
          <Boton
            color={this.state.colores[2]}
            click={() => this.aumenta(2)}
            valor={this.state.botones[2]}
          />
          <Boton
            color={this.state.colores[3]}
            click={() => this.aumenta(3)}
            valor={this.state.botones[3]}
          />
          <Boton
            color={this.state.colores[4]}
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
