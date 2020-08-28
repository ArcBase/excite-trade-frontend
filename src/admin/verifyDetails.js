import React, { Component } from 'react'
import { connect } from "react-redux";
import {Row, Col , List, Avatar ,Rate,Input , 
    Spin ,Card , Form, Button ,Select , DatePicker , Upload, message,notification ,Switch} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined ,UploadOutlined  } from '@ant-design/icons'
import axios from "axios";

import {vendorVerification} from '../constants'

const Search = Input.Search;
const TextArea = Input.TextArea
const { Option } = Select;
const { RangePicker } = DatePicker;

const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description: msg
    });
  };

class VerifyAccount extends Component {

    state = {
        data: []
    }

    handleVerify = (token) =>{
        const farmerID = this.props.match.params.farmerID;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        axios.get(vendorVerification, {farmerID}).then(res => {
          this.setState({
            data: res.data
          });
          console.log(this.state.data);
          
        });
    }

    Submit_Verification = async()=>{
        const farmerID = this.props.match.params.farmerID;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
      axios.post(vendorVerification, {farmerID}) 
        .then(res =>{
            openNotification(res.data['Message'])
            window.location.reload();
        })
    }
      
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.handleVerify(this.props.token);
        }
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.handleVerify(newProps.token);
          }
        }
    }
    
    render() {
        const {data} = this.state
        console.log(data);
        
        return (
            <div className="container mx-auto my-10">
              <div className="base-card">

              {data.verified  ? 
                <p>Account has been verified</p> : <Switch onChange={this.Submit_Verification} />
               }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };
  
  /*  const mapDispatchToProps = dispatch => {
      return {
       // refreshCart: () => dispatch(fetchCart())
      };
}; */
  
export default connect(
    mapStateToProps,
    null
  )(VerifyAccount);
  

