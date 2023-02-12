import React, { Component } from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
} from './navbarElements';

class Header extends Component {
  render() {
    return (

      <header>
      <Nav>
        <NavLink to='/'>
          <img src={require('../img/logo2.svg')} alt='logo' style={{height:'20vh',width:'20wh',padding:'10px'}} />
        </NavLink>
        <NavMenu>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/photo' activeStyle>
            Photo Input
          </NavLink>
          <NavLink to='/camera' activeStyle>
            Webcam Input
          </NavLink>
        </NavMenu>
      </Nav>
    </header>
    );
  }
}

export default Header;
