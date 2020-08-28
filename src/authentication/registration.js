import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import {message} from 'antd'

import * as actions from "../store/actions/auth";
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
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { registrationURL} from '../constants'

class RegistrationForm extends React.Component {
  state = {

  };

  
  verifySubmit = (values)=> {

    const form_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const password_1 = values['password1']
    
    const password_2 = values['password2']
    
    if (password_1.match(form_regex)){
            
          if (password_1 != password_2){
            message.error('Your Passwords don`t match')
        }
        else if(password_1 && password_2 <= 8){
          message.error('Your Passwords must not be lesser than 8 letters')
        }
        
        else{
          var email_regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          const email = values['email']
          if (email.match(email_regex)){
            //Email Validation passes
            let is_buyer = false
            // let is_seller = true
            // if (values['userType']  === "buyer"){
            //   is_buyer = true
            //   } 
            this.props.onAuth(
              values['username'],
              values['email'] ,
              values['password1'],
              values['password2'],
              is_buyer,
              
              // expirationDate: new Date(new Date().getTime() + 3600 * 1000)
            );
            console.log(
              values['username'],
              values['email'] ,
              values['password2'],
              values['password2'],
              is_buyer,
             
            )
           message.success('Account created successfully')
           // localStorage.setItem("user", JSON.stringify(user));
           this.props.history.push("/vendor/setup-profile/");
          }else{
            //Email validation verifies its wrong
            message.error('Please enter a valid email adress')
          }

      } 

    }
    else{
      message.error('Your Passwords must contain at least one Uppercase \n one special character \n and one numeric digit ')
    }
  
  };


  handleSubmit = (values) => {

      const username = values['username']
      const email = values['email']
      const password1 = values['password']
      const password2 = values['password2']
      const option = values['option']
      

      // const verify = this.verify(password1 , password2)

      let is_buyer = false;
      // if (values.option === "buyer") is_buyer = true;
      const user = {
        username,
        email,
        password1,
        password2,
        is_buyer,
        is_seller: !is_buyer
      };
      console.log(user);
      axios
        .post(registrationURL, user)
        .then(res => {
          const user = {
            token: res.data.key,
            username,
            userId: res.data.user,
            is_buyer,
            is_seller: !is_buyer,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000)
          };
          localStorage.setItem("user", JSON.stringify(user));
          
          console.log(user);
          this.props.history.push("/")
          window.location.reload();

        
        })
        .catch(err => {
        //  dispatch(authFail(err));
        console.log(err);
        });
      

  };


render() {


      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      const Demo = () => {
        const onFinish = values => {
          console.log('Success:', values);
        };
      }

        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };


return (
    
      <>

<div className="access-form-layout">
                <div className="access-form-image">
                <div className="access-form-bg-image">
                    <div className="access-header-intro">
                        <h3>
                        Excite Enterprise
                        </h3>
                        <p>
                        We Grow SMEs
                        </p>
                    </div>
                </div>
                </div>

                <div className="access-form-box">
                <nav className="access-main-nav">
                    <ul>
                    
                    </ul>
                    </nav>

                <div className="form-box">

                        <div className="login-welcome-intro">
                                        <h3>
                                         Create an account
                                        </h3>
                                </div>

                                <Form onFinish={this.verifySubmit} className="form-box-w">
                                    <Form.Item>
                                        {/* <h1 style={{fontSize:23, textAlign:'left'}} className="">Create an account</h1> */}
                                            </Form.Item>

                                            <Form.Item name ="username">
                                            
                                                <Input
                                                    placeholder="Username" enterButton
                                                />
                                            </Form.Item>
                                            
                                            <Form.Item name ="email">
                                                <Input
                                                    placeholder="Email" enterButton
                                                />
                                            </Form.Item>
                                            
                                            <Form.Item  name="password1"
                                                rules={[
                                                {
                                                required: true,
                                                    message: 'Please input your password!',
                                                    },
                                        ]}> 
                                            <Input
                                                    placeholder="Password"
                                                    enterButton
                                                />
                                            </Form.Item>

                                            <Form.Item  name="password2"
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Please confirm your password!',
                                                },
                                               
                                            ]}
                                            > 
                                            <Input
                                                    placeholder="Confirm Password"
                                                    enterButton
                                                />
                                            </Form.Item>

                                            
                                         

                                        <Form.Item >
                                        <button className="custom-button" type="submit">
                                            Submit
                                        </button>
                                    </Form.Item>

                                </Form>
                        <div className="">
                                <Link to="/login">
                                <p className="access-suggestion">
                                    Already have an account? Sign in
                                </p>
                                </Link>
                                <br/>

                                <Link to="#">
                                <p className="access-suggestion">
                                Forgot Password ? 
                                    </p>
                                </Link>
                                
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
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, is_buyer) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_buyer)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
