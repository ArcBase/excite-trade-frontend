import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import SideDrawer from '../Sidebar/SideNav'


 class BuyerOrderDetail extends Component {

    state = {
        data: ''
    }

    getDetail = (token) => {
        const order_id = this.props.match.params.orderID
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          };
        axios.get(`https://trade-backn.herokuapp.com/buyer/order-details/${order_id}/`)
        .then(res => {
            if (res.status == 200){
                this.setState({
                  data: res.data
                })
                console.log(res.data)
            }
        })
    }

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          // this.getOrderList(this.props.token);
          this.getDetail(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            // this.getOrderList(newProps.token);
            this.getDetail(newProps.token)
          }
        } 
      }


    render() {

        const {data} = this.state
        console.log(data)
        return (
            <>
                 <SideDrawer />
                <div className="main">
                <div className="order-card">


                        <h1>Order Detail</h1>

                    <div className="order-card-content">
                        <p>
                            Name: {data.theProduct}
                        </p>
                        <p>
                          Quantity: {data.Quantity}
                        </p>
                        <p>
                           Weight: {data.Weight}
                        </p>
                        <p>
                           Port Location: {data.PortLocation}
                        </p>
                        <p>
                           Delivery Type: {data.PortType}
                        </p>
                        <p>
                        Delivery Location: {data.DeliveryLocation}
                        </p>
                        <p>
                        Delivery Date:  {data.DeliveryDate}
                        </p>
                       
                    </div>
                </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null,
    };
};

export default connect(mapStateToProps, null)(BuyerOrderDetail)
