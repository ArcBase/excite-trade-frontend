import React from "react";

import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";

// import ExciteNav from '../excite_components/General/sections/nav'

import {
  Form,
  Select,
  Input,
  notification
} from "antd";

const Search = Input.Search;
const { Option } = Select;
a ='s'

class AdminLoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  //handleChange = e => {
    //this.setState({ [e.target.name]: e.target.value });
  //};

  handleSubmit = (values) => {

  const username = values['username'] 
  const password  = values['password']

    this.setState({
      username :  values['username'] ,
      password : values['password']
    })
    this.props.login(username, password)
    .then((res) => {
        alert('works')  
    }).catch((err) => {
      alert('failed')  
    });
  }

  openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      
    });
  }

  render() {
    const { error, loading, token } = this.props;
    console.log(token)
    const { username, password } = this.state;
    if (token) {
     // this.openNotification('Login Successful')
      return <Redirect to="/trade-admin/" />;
    }
    const formItemLayout = {
      wrapperCol: { span: 12, offset: 6 }
    };
    return (

            <>

 
                
              <div
              style={{paddingTop:30}}
              className="fitter">
        <div className="form-container">
             <div className="form-box ">

             <div className="login-welcome-intro">
                              <h3>
                                Welcome Admin! 
                              </h3>
                   </div>

             <Form className="form-box-width" {...formItemLayout} onFinish={this.handleSubmit}>
          <Form.Item rules={[{ required: true, message:'Username is required' }]}>
            
          </Form.Item>
          <Form.Item 
          rules={[{ required: true, message:'Username is required' }]}
          name ="username">
          <Input
          
           placeholder="Username" />

            
          </Form.Item>
          <Form.Item
          rules={[{ required: true, message:'Password is required' }]}
           name ='password'> 

          <Input.Password placeholder=" password" />
            
          </Form.Item>

          <Form.Item >
            <button
              class="form-button"
             htmlType="submit">
              Login
            </button>
          </Form.Item>

          </Form>



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
    error: state.auth.error,
    token: state.auth.token,    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLoginForm);
