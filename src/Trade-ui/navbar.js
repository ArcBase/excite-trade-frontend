import React, { Component } from 'react';

import Toolbar from './Navbar/components/Toolbar/Toolbar';
import SideDrawer from './Navbar/components/SideDrawer/SideDrawer';
// import Backdrop from './Navbar/components/backdrop/Backdrop';

import Backdrop from './Navbar/components/Backdrop/Backdrop'

class NavbarTwo extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div style={{height: '100%'}}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}    
      </div>
    );
  }
}

export default NavbarTwo;
