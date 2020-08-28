import React from "react";
import { authAxios } from "../utils";
import { Link, Redirect } from "react-router-dom";
import { orderSummaryURL, orderItemDeleteURL,
  orderItemUpdateQuantityURL, addToCartURL } from "../constants";
import { connect } from "react-redux";
import { fetchCart } from "../store/actions/cart";

import {Button} from 'antd'
import Paystacker from '../containers/Payment/Paystack'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import OrderTable from './OrderSum'

import axios from "axios";
import CheckoutPage from "./CheckoutPage";


class OrderSummary extends React.Component {
  state = {
    data: [],
    order_data: [],
    order_id : null,
    order_price : null,
    error: null,
    loading: false,
    Load_pay: false,

  };


  handleFetchOrder = (token) => {
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios.get(orderSummaryURL)
      .then(res => {
        this.props.refreshCart(token);
        this.setState({
          data: res.data,
          order_data: res.data.order_items,
    // order_id : res.data.id,
    // order_price : res.data.order_items.total_item_price,
        })
        console.log('item prices', this.state.order_price)
      })
      .catch(err => {
        if (err) {
          // response.status == 404
          console.log(err)
        }
        this.setState({ error: err, loading: false });
      });

  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.handleFetchOrder(this.props.token)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.handleFetchOrder(newProps.token)
      }
    }
  }

  handleAddToCart = slug => {
    this.setState({ loading: true });
    //const variations = this.handleFormatData(itemVariations);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .post(addToCartURL, { slug })
      .then(res => {
        this.props.refreshCart(this.props.token);

        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };


  handleRemoveQuantityFromCart = slug => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.post(orderItemUpdateQuantityURL, { slug })
      .then(res => {
        this.props.refreshCart(this.props.token);
        this.handleFetchOrder(this.props.token);
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleRemoveItem = itemID => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.delete(orderItemDeleteURL(itemID))
      .then(res => {
        this.handleFetchOrder(this.props.token);
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  Trigger_Pay = () =>{
    this.setState({
      Load_pay:true
    })
  }


  render() {
    const { order_data, error, loading, order_id, order_price ,Load_pay, data } = this.state;
    //console.log('this is ', order_price);
    console.log(data)
    const a = new Set(data.items)
    const cart_quantity = Array.from(a)
    console.log(a);
    console.log(cart_quantity.length)    

return (
  <>

  <div className=" container mt-10">

    <div className=" grid grid-cols-6 gap-2 ">

        <div className="sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">

        <div className="base-card mt-10">

            <table>
              <tr>
                <th>Product Name</th>
                        <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
              {order_data.map((o, i) =>(
                  <>
              <tr key={o.id}>
                  <td>{o.item.title}</td>
                  <td>{o.quantity}</td>
                  <td>{o.total_item_price}</td>
                  <td>
                    <span> <button  onClick={() => this.handleRemoveQuantityFromCart(o.item.slug)}>
                    <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                    </button>
                    <button  onClick={() => this.handleAddToCart(o.item.slug)}>
                    <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                    </button></span>
                    </td>
              </tr>
                  </>
                ))
              }

            </table>
            </div>

        </div>

        <div className=" sm:col-span-5 md:col-span-6 lg:col-span-2 xl:col-span-2">
              <div className="">
                <div className="max-w-sm flex p-6 rounded-lg shadow-md">
                  <div>
                  <p className="text-base">
                      Total: <b>${data.total}</b>
                    {/* <p> Items: <b>{data.items.length()}</b></p> */}
                    </p>
                    <p>Date: {data.start_date}</p>
                    <p>Cart Quantity: {cart_quantity.length} items</p>
                    </div>
                  </div>
              </div>
        </div>

        <div className="sm:col-span-6 md:col-span-6 xl:col-span-5">
              <button className="text-white font-bold py-2 px-4"> 
              <Link to='/checkout'>Checkout Now</Link>
              </button>
        </div>

    </div>

              <div>
                <OrderTable data={order_data} extra={cart_quantity} />
              </div>

  </div>

  </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: (token) => dispatch(fetchCart(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);
