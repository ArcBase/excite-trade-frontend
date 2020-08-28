import React, { Component, Fragment } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default class Nav extends Component {
  render() {
    return (
      <>
        <div className=" ">
          <ul className="navblock">
            <div className="container mx-auto">
              <li className="navlist active">
                <Link to="/">Home</Link>
              </li>
              <li className="navlist">
                <Link to="/products">Shop</Link>
              </li>
              {this.props.isAuthenticated ? (
                <Fragment>
                  {this.props.seller ? (
                    <li className="navlist">
                      <Link to="/farmer-dashboard">Dashboard</Link>
                    </li>
                  ) : (
                    <li> </li>
                  )}
                  <li className="navlist">
                    <a href="/" onClick={this.props.logout}>
                      Logout
                    </a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="navlist">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="navlist">
                    <Link to="/register">Sign up</Link>
                  </li>
                </Fragment>
              )}
            </div>
          </ul>
        </div>
      </>
    );
  }
}
