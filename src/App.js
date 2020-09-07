import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import "antd/dist/antd.css";
import "./assets/dashboard.css"
import "./assets/logicstics.css"
import "./assets/enterprise.css"
import "./assets/tab.css"
import "./assets/mater.css"

import './assets/css/generalStyle.css'
import './assets/css/informationCards.css'
import './assets/css/AuthenticationForms.css'
import './assets/css/LoginLayout.css'

import './assets/newcss/layout.css'
import './assets/newcss/nav.css'
import './assets/newcss/style.css'
import './assets/newcss/fresh.css'
import './assets/newcss/responsive.css'

//import "./App.css"
import * as actions from "./store/actions/auth";
import CustomLayout from "./containers/Layout";
import tawkTo from "tawkto-react";
const tawkToPropertyId = "5ccd362fd07d7e0c6391e169";


// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// //import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

// library.add(fab)

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
        tawkTo(tawkToPropertyId);
  
  }

  render() {
    return (
      <Router>
        <CustomLayout {...this.props}>
          <BaseRouter />
        </CustomLayout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
