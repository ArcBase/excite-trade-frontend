import React, { Component } from "react";
import SideDrawer from "./Sidebar/SideNav";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SimpleTable from "./components/table";
import OrderList from './components/orderListTables'
import {Bar, Line ,Radar} from 'react-chartjs-2';
import {message} from 'antd'

const host = 'http://127.0.0.1:8000'

class TradeMain extends Component {
  state = {
    orderList: [],
    countsData : [] ,

    profileCount : [] ,
    productsCounts: [],
    ordersCounts:[],

    chartData : [],
  };

  getData = async(token)=>{
    const endpoint = host + `/eAdmin/get-data/`
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
          profileCount:res.data['profiles'] ,
          productsCounts : res.data['productItemsQs'] ,
          orders : res.data['orders']
        })
        console.log(res.data)
      }
    })
  }

  getOrderList = async(token)=>{
    const endpoint = host + `/eAdmin/orders-list/`

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
          orderList:res.data
        })
        console.log(res.data)
      }
    })
  }


  polulateChart = ()=>{
    this.setState({
      chartData:{
        labels: ['*','Revenue' ,'Total Products' ,'Orders'],
        datasets:[
          {
            label:'Impressions',
            data: [0,'230', '260','300'],
            backgroundColor:[
              
              'rgb(9, 173, 50)',
              'rgb(9, 173, 50)',
              'rgb(9, 173, 50)',
            ]
          }
        ]
      }
    })
    }
  
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.getOrderList(this.props.token);
      this.polulateChart(this.props.token)
      this.getData(this.props.token)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.getOrderList(newProps.token);
        this.polulateChart(newProps.token)
        this.getData(newProps.token)
      }
    } 
  }


  render() {
    const  {orderList ,profileCount ,productsCounts ,ordersCounts} = this.state
    const {isAuth} = this.props

    if (isAuth === false){
      message.error('Login to access Administration Section')
      window.location.replace("/admin-login/")
    }else{
      let AllowAdmin  = true
    }

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
                            {orderList.length}
                            </p>
                          </div>
                      </li>


                      <li className="display-cards-list">
                          <div className="display-cards-box">
                            <h3 className="display-card-title-default">
                             Vendors
                            </h3>
                            <p  className="display-card-text-default">
                              {parseInt(profileCount)}
                            </p>
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box ">
                            <h3 className="display-card-title-default">
                             Products
                            </h3>
                            <p  className="display-card-text-default">
                            {parseInt(productsCounts)}
                            </p>
                          </div>
                      </li>
                    </ul>
             </div>  

             <div className="fitter">
               <OrderList orderListData={orderList} />
             </div>

              <div className="fitter">

                  <div className="page-grid">
                 
                  <div className="left">
  
                  </div>

                  <div className="right">

                  </div>

                  </div>



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

export default connect(mapStateToProps, null)(TradeMain)
