import { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Menu';
import AppLogin from './componentes/AppLogin';
import {PHPLOGIN} from './componentes/Datos'
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      menuItem:undefined,
      info:"",
      logged:false,
    }
  }

  changeMenu(item){
    this.setState({menuItem:item})
  }

  userLogin(telefono,password){
    //console.log(telefono+" "+password)
    axios.post(PHPLOGIN,JSON.stringify({
      telefono:telefono,
      password:password
    })).then( res=>{
        if(res.data.usuario!==undefined){
          this.setState({logged:true})
        }
        this.setState({info:res.data.mensaje})

      }
    );
    //this.setState({info:"USUARIO O PASSWORD NO VÁLIDA"})
  }
  setInfo(i){
    this.setState({info:i})
  }

  render(){
    let obj=[];
    if (!this.state.logged){
      obj.push(
        <AppLogin setInfo={(i)=>this.setInfo(i)} userLogin={(telefono,password)=>this.userLogin(telefono,password)} info={this.state.info}/>
        )
    }else{
      obj.push(        
        <Menu menuItem={this.state.menuItem} changeMenu={(item)=>this.changeMenu(item)}/>
      )
    }
    return (
      <div className="App">
        {obj}
      </div>
    );
    }
}

export default App;
