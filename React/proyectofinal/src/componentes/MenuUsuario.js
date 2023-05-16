import React from 'react';
import { Navbar, NavLink, NavbarBrand, Button, ButtonGroup } from 'reactstrap';


export default function Menu(props) {
    
    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">Bienvenido</NavbarBrand>
                <NavLink>
                    <ButtonGroup>
                        <Button color='danger' onClick={()=>{
                            window.location.reload()
                            return props.changeMenu("LOGOUT")}}>LOGOUT</Button>
                    </ButtonGroup>
                </NavLink>
            </Navbar>
        </div>

    );
}