import React, { Component } from "react";
import  TempoaryDrawer from '../SideBar/SideNav'

import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message,
  } from 'antd';

  const { Option } = Select;
  const host = 'https://trade-backkn.herokuapp.com'

class vendorSetupProfile extends Component {
  state = {
    vendorProducts :[],
  };


  submitProfile = async(values)=>{
    const endpoint = host + `/vendor/profile-edit/`

      const fName = values['FirstName']
      const lName = values['LastName']
      
      const Phone = values['Phone']
      const BusinessName = values['BusinessName']
      const WareHouseBase = values['WareHouseBase']
      const MonthlySupply = values['MonthlySupply']
      const SeasonType = values['SeasonType']
      const LocalGovernment = values['LocalGovernment']
      const State = values['State']
      const Country = values['Country']

        let fd = new FormData()
        fd.append('fName' ,fName)
        fd.append('lName',lName)
        fd.append('Phone',Phone)
        fd.append('MonthlySupply',MonthlySupply)
        fd.append('BusinessName',BusinessName)
        fd.append('WareHouseBase',WareHouseBase)
        fd.append('SeasonType',SeasonType)
        fd.append('LocalGovernment',LocalGovernment)
        fd.append('State',State)
        fd.append('Country',Country)

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`,
          };
        await axios.post(endpoint ,fd)
        .then(res =>{
            if (res.status == 200){
                message.success('Profile Created Succuessfully')
                this.props.history.push('/vendor/dashboard')
            }else{
                message.error('Error setting up profile')
            }
        })

  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
  
      }
    } 
  }


  render() {
    const  {vendorProducts} = this.state
    return (
      <>
        <TempoaryDrawer />
        <div className="main">

             

              <div className="fitter">

                  <div className="page-grid">

                  <div className="left">
                        <div className="form-box">
                            <div className="login-welcome-intro">
                                <h3>
                                Setup Your Profile
                                </h3>

                                <div className="">
                                <Form className="form-box-width"
                                             onFinish={this.submitProfile}>
                                 
                                         <Form.Item 
                                         rules={[{ required: true, message:'First Name is required' }]}
                                         name ="FirstName">
                                         <Input
                                         size="large"
                                         placeholder="FirstName" />
                                         </Form.Item>

                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="LastName">
                                         <Input
                                         size="large"
                                         placeholder="LastName" />
                                         </Form.Item>

                                
                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="BusinessName">
                                         <Input
                                         size="large"
                                         placeholder="Business Name" />
                                         </Form.Item>

                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="Phone">
                                         <Input
                                         size="large"
                                         placeholder="Company Phone Number" />
                                         </Form.Item>


                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="WareHouseBase">
                                         <Input
                                         size="large"
                                         placeholder="Warehouse Location ?" />
                                         </Form.Item>

                                         <Form.Item name="SeasonType"
                                         rules={[{ required: true }]}>
                                            <Select
                                            placeholder="Season Type"
                                            
                                            >
                                            <Option value="male">Off Season</Option>
                                            <Option value="female">On Season</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item name="MonthlySupply"
                                         rules={[{ required: true }]}>
                                              <Input
                                         size="large"
                                         placeholder="Your Monthly Supply" />
                                        </Form.Item>


                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="LocalGovernment">
                                         <Input
                                         size="large"
                                         placeholder="Local Government Area" />
                                         </Form.Item>

                                         <Form.Item

                                         rules={[{ required: true }]}
                                         name ='State'> 

                                         <Input
                                         size="large"
                                         placeholder=" State" />
                                            
                                         </Form.Item>

                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="Country">
                                         <Input
                                         size="large"
                                         placeholder="Country" />
                                         </Form.Item>


                                         <Form.Item >
                                           <button
                                             class="custom-button"
                                           htmlType="submit">
                                             Setup
                                           </button>
                                         </Form.Item>

                                         </Form>

                                </div>

                            </div>
                        </div>
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
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
     
    };
};


  
export default connect(
    mapStateToProps,)(vendorSetupProfile)