import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { Form, Input, Button, Checkbox } from 'antd';
import { Link, withRouter } from "react-router-dom";


class NormalLoginForm extends React.Component {
  Handle_Login = (values) => {

      const username = values['username']
      const password = values['password']
      console.log(username);
      this.props.onAuth(username, password);
      this.props.history.push("/vendor/dashboard/");

  };

render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
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
     

<div className="">
<div className="access-form-layout">
                   <div className="access-form-image">
                     <div className="access-form-bg-image">
                       <div className="access-header-intro">
                           <h3>
                          Excite Trade
                           </h3>
                          
                       </div>
                     </div>
                   </div>


                   <div className="access-form-box">
                   <nav class="access-main-nav">
                         <ul>
                           <li>
                             <Link to="/">
                             <div className="ExciteContainer">
                             <img
                             className="Excite"
                             src /> 
                             </div>
                             </Link>
                           </li>
                         
                         </ul>
                       </nav>

                   <div className="form-box">

                             <div className="login-welcome-intro">
                                             <h3>
                                               Welcome Back 
                                             </h3>
                                   </div>

                                   <Form className="form-box-width"
                                             onFinish={this.Handle_Login}>
                                 
                                         <Form.Item 
                                         rules={[{ required: true, message:'Username is required' }]}
                                         name ="username">
                                         <Input
                                         size="large"
                                         placeholder="Username" />

                                           
                                         </Form.Item>
                                         <Form.Item

                                         rules={[{ required: true, message:'Password is required' }]}
                                         name ='password'> 

                                         <Input.Password 
                                         size="large"
                                         placeholder=" password" />
                                           
                                         </Form.Item>

                                         <Form.Item >
                                           <button
                                             class="form-button"
                                           htmlType="submit">
                                             Login
                                           </button>
                                         </Form.Item>

                                         </Form>

                            <div className="">
                                     <Link to="/select-account/">
                                      <p className="access-suggestion">
                                     New here ? Sign Up
                                       </p>
                                     </Link>
                                     <br/>

                                     <Link to="/login/">
                                      <p className="access-suggestion">
                                      Forgot Password ? 
                                       </p>
                                     </Link>
                                    
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
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NormalLoginForm);
