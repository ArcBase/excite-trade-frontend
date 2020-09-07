import React, { Component } from "react";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "./Toolbar.css";
import Logo from "./ExciteLogo.png";
import * as actions from "../../../../store/actions/auth";

class toolbar extends Component {

  // state = {
  //   data: ''
  // }

  // getCategories = () => {
  //   axios.get('http://127.0.0.1:8')
  // }


  render() {
    const { isAuth } = this.props;
    console.log(isAuth);
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar__logo">
            <a href="/">
              <img className="logo" src={Logo} />
            </a>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
            <li className="nav-it">
                <a className="nav-link-text" href={`/product-category/${3}`}>
                  Petroluem Products
                </a>
              </li>
              <li className="nav-it">
                <a className="nav-link-text" href={`/product-category/${2}`}>
                Agriculture Products                  
                </a>
              </li>
              <li className="nav-it">
                <a className="nav-link-text" href={`/product-category/${1}`}>
                  Mineral Resources
                </a>
              </li>
              {isAuth ? (
                <>
                  <li className="nav-it">
                    <a
                      className="nav-link-text"
                      href="/customer-dashboard"
                    >
                      Dashboard
                    </a>
                  </li>                
                  <li className="nav-it">
                    <a
                      className="nav-link-text"
                      href="/"
                      onClick={this.props.logout}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-it">
                    <a className="nav-link-text" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-it">
                    <a className="nav-link-text" href="/customer-registration">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    is_seller: state.auth.is_seller,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

// const mapDispatchToProps = dispatch => {
// return {
//   member: (token) => dispatch(getMembership(token))
// }
// }

export default connect(mapStateToProps,mapDispatchToProps)(toolbar);
