import React, { Component } from "react";
import SideDrawer from "../Sidebar/SideNav";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import OrderDetailTable from './orderDetailsTable'

import {
  Carousel,
  Tabs,
  Row,
  Col,
  List,
  Avatar,
  Rate,
  Input,
  Spin,
  Card,
  Form,
  Button,
  Select,
  DatePicker,
  Upload,
  message,
  notification,
} from "antd";

const host = 'https://trade-backn.herokuapp.com'

class adminOrderDetail extends Component {
  state = {
    orderDetailsData: [],
  };

  getOrderDetails = async(token)=>{
    
    const orderID = this.props.match.params.orderID
    const endpoint = host + `/eAdmin/orders-details/${orderID}`

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
          orderDetailsData:res.data
        })
      }
    })
  }

  updateOrderCost = async(values)=>{
    const orderID = this.props.match.params.orderID
    const endpoint = host + `/eAdmin/update-cost/${orderID}`

    const Cost = values['Cost']
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    await axios.get(endpoint ,{
      params: {
        Cost
      }
    })
    .then(res =>{
      if (res.status == 200){
        this.getOrderDetails(this.props.token)
        message.success('Cost Update Successfully')
      } else{
        message.error('Error Updating Cost')
      }
    })
  }
  



  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.getOrderDetails(this.props.token);
    } else {
      this.getOrderDetails();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.getOrderDetails(newProps.token);
      }
    } else {
      this.getOrderDetails();
    }
  }


  render() {
    const  {orderDetailsData} = this.state
    return (
      <>
        <SideDrawer />
        <div className="main">
              <div className="fitter">
                <OrderDetailTable orderData={orderDetailsData} />
              </div>


            <div className="fitter">
              <div className="page-grid">
                <div className="right">
                  
                <div className="dashboard-form-container">
              <div className="dashboard-form-box">

                  <Form 
                  className="dashboard-form-box-width"
                  onFinish={this.updateOrderCost}>
                    <Form.Item>
                    <h1 className="" style={{fontSize:20}}>Order Form</h1>
                    </Form.Item>

                    <Form.Item rules={[{ required: true }]} name="Cost">
                    <Input placeholder="Estimated Cost " enterButton />
                    </Form.Item>

                    


                    <Form.Item >
                    <button
                        type="primary"
                        htmlType="submit"
                        className="custom-button"
                        onClick={this.handleSubmit}
                    >
                        Update Cost
                    </button>
                    </Form.Item>
                </Form>

              </div>
            </div>


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

export default connect(mapStateToProps, null)(adminOrderDetail)
