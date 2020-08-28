import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import Logo from './ExciteLogo.png'

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo"><a href="/"><img  className="logo" src={Logo} /></a></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
            <ul>
              
                <li className="nav-it"><a className="nav-link-text" href="/eproducts">Market Place</a></li>
          
                <li className="nav-it"><a className="nav-link-text" href="/login">Login</a></li>
                <li className="nav-it"><a className="nav-link-text" href="/register">Register</a></li>

            </ul>
        </div>
    </nav>
  </header>
);

export default toolbar;
