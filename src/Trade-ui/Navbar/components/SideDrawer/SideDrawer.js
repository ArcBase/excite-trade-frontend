import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        
        <li className="side-nav-item"><a href="/">MarketPlace</a></li>
            <li className="side-nav-item"><a href="/">Sell on excite</a></li>
            <li className="side-nav-item"><a href="/">Dashboard</a></li>
            <li className="side-nav-item"><a href="/">Login</a></li>
            <li className="side-nav-item"><a href="/">Register</a></li>
        <li><button class="navbar-button">Get started on Excite</button></li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
