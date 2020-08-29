import React, { Component } from "react";
import SideDrawer from "./Sidebar/SideNav";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import OrderTable from "./components/order-table";
import {Bar, Line ,Radar} from 'react-chartjs-2';
import {message} from 'antd'

const host = 'https://trade-backn.herokuapp.com'

class CustomerDashboard extends Component {
  state = {
    data: ''
  }

  getData = async(token)=>{
    const endpoint = host + `/buyer/orders-list/`
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
          data: res.data
        })
        console.log(res.data)
      }
    })
  }

  // getOrderList = async(token)=>{
  //   const endpoint = host + `/eAdmin/orders-list/`

  //   axios.defaults.headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${token}`,
  //   };
  //   await axios.get(endpoint)
  //   .then(res =>{
  //     if (res.status == 200){
  //       this.setState({
  //         orderList:res.data
  //       })
  //       console.log(res.data)
  //     }
  //   })
  // }
  
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      // this.getOrderList(this.props.token);
      this.getData(this.props.token)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        // this.getOrderList(newProps.token);
        this.getData(newProps.token)
      }
    } 
  }

  render() {
    const  {data} = this.state
    console.log(data)
    const {isAuth} = this.props

    // if (isAuth === false){
    //   message.error('Login to access Administration Section')
    //   window.location.replace("/admin-login/")
    // }else{
    //   let AllowAdmin  = true
    // }

    const a = new Set(data)
    const orders = Array.from(a)

    return (
      <>
        <SideDrawer />
        <div className="main">

        <div className="fitter">
                    <ul className="display-cards-container">
                      <li className="display-cards-list">
                          <div className="display-cards-box display-green">
                            <h3 className="display-card-title-override">
                            Orders
                            </h3>
                            <p  className="display-card-text">                           
                           {orders.length}
                            </p>
                          </div>
                      </li>


                      <li className="display-cards-list">
                          <div className="display-cards-box">
                            <h3 className="display-card-title-default">
                             Date Joined
                            </h3>
                            <p  className="display-card-text-default">
                              2020-08-29
                            </p>
                          </div>
                      </li>

                      {/* <li className="display-cards-list">
                          <div className="display-cards-box ">
                            <h3 className="display-card-title-default">
                            
                            </h3>
                            <p  className="display-card-text-default">
                            Test
                            </p>
                          </div>
                      </li> */}
                    </ul>
             </div>  

             <div className="fitter">
               <OrderTable data={orders} />
             </div>

              
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null,
    };
};

export default connect(mapStateToProps, null)(CustomerDashboard)
