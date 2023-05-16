import React from 'react';
import { Navbar, NavLink, NavbarBrand, Button, ButtonGroup } from 'reactstrap';

export default function Menu(props) {
    let colorUno = 'secondary';
    let colorDos = 'secondary';
    let colorTres = 'danger';
    switch (props.menuItem) {
        case "PANTALLAS":
            colorUno = 'primary';
            break;
        case "ANUNCIOS":
            colorDos = 'primary';
            break;
        

    }
    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">Bienvenido</NavbarBrand>
                <NavLink>
                    <ButtonGroup>
                        <Button color={colorUno} onClick={()=>props.changeMenu("PANTALLAS")}>PANTALLAS</Button>
                        <Button color={colorDos} onClick={()=>props.changeMenu("ANUNCIOS")}>ANUNCIOS</Button>
                        <Button color={colorTres} onClick={()=>{
                            window.location.reload()
                            return props.changeMenu("LOGOUT")}}>LOGOUT</Button>
                    </ButtonGroup>
                </NavLink>
            </Navbar>
        </div>

    );
}