import React, {Fragment}from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'


class CustomLayout extends React.Component {

  // componentDidMount() {
  //   if (this.props.token !== undefined && this.props.token !== null) {
  //     this.props.refreshCart(this.props.token);
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.token !== this.props.token) {
  //     if (newProps.token !== undefined && newProps.token !== null) {

  //       this.props.refreshCart(newProps.token);

  //     }
  //   }
  // }


  render() {
    // const { cart } = this.props;

    return (
      <>

  <div className="">
          {this.props.children}
  </div>

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    seller: state.auth.is_seller,
    authenticated: state.auth.token !== null,
    // cart: state.cart.shoppingCart,
    // loading: state.cart.loading

  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    refreshCart: (token) => dispatch(fetchCart(token))

  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
