import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from "axios";
import OrderSummary from "./OrderSummary"
import {checkoutURL,orderSummaryURL,addressListURL} from "../constants";
import {Row, Col , List, Avatar ,Rate,Input , 
Spin ,Card , Form, Button ,Select , DatePicker , Upload, message,notification} from 'antd';
const Search = Input.Search;
const TextArea = Input.TextArea
const { Option } = Select;
const { RangePicker } = DatePicker;
  

class CheckoutPage extends Component {

    state = {
        data: [],
        loading: false,
        error: null,
        success: false,
      };
        
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.handleFetchOrder(this.props.token);
        }
      }
    
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.handleFetchOrder(newProps.token);
          }
        }
    }
   
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.values
        })
    };

    handleFetchOrder = (token) => {
        this.setState({ loading: true });
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
         };
        axios.get(orderSummaryURL)
        .then(res => {
            this.setState({ data: res.data, loading: false });
            console.log(this.state.data);
            
        })
        .catch(err => {
          if (err) { //err.response.status === 404
              //this.props.history.push("/products");
              console.log(err);
              
            } else {
              this.setState({ error: err, loading: false });
            }
          });
  };
    
    
    handleSubmit = (values) => {
        const billing_address = values['billing_address']
        const shipping_address = values['shipping_address']
        const firstName = values['firstName']
        const lastName = values['lastName']
        const email = values['email']
        const phone1 = values['phone1']
        const phone2 = values['phone2']
        const state = values['state']
        const zip = values['zip']

        let form_data = new FormData()
        form_data.append('billing_address', billing_address )
        form_data.append('shipping_address', shipping_address )
        form_data.append('firstName', firstName )
        form_data.append('lastName', lastName )
        form_data.append('email', email )
        form_data.append('phone1', phone1 )
        form_data.append('phone2', phone2 )
        form_data.append('state', state )
        form_data.append('zip', zip )        
      
        axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
        };
        const id = this.props.match.params.checkoutID
        axios.post(checkoutURL ,form_data)
        .then(res => {
          this.setState({ loading: false, success: true, data: res.data });
          })
          .catch(err => {
            this.setState({ loading: false, error: err });
            });
      }
      
    render() {
    
    const {data,error, loading, success} = this.state;
    console.log(data);
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="86">+233</Option>
          <Option value="87">+234</Option>
        </Select>
      </Form.Item>
    );
    
  return (
<>
  <div className="container mx-auto my-10">

    <div className="grid grid-cols-12">

      <div className="col-span-6">
            <OrderSummary />
      </div>

        <div className="col-span-6">
          <div className="w-full md:w-12/12 px-4">
                    <div className="base-card">
                      
                    <Form  onFinish={this.handleSubmit}>
                            <Form.Item>
                              <h1 className="ant-form-text">Checkout Form</h1>
                              </Form.Item>
                      
                          <Form.Item rules={[{ required: true }]}  name ="billing_address">
                                      <Input placeholder="Billin Address"  id='billing_address' enterButton  />
                          </Form.Item>

                          <Form.Item rules={[{ required: true }]}  name ="shipping_address">
                                      <Input placeholder="Shipping Address" 
                                        id='shipping_address' enterButton     />
                          </Form.Item>

                          <Form.Item rules={[{ required: true }]}  name ="firstName">
                                      <Input placeholder="First Name" 
                                      id='firstName' enterButton />
                          </Form.Item>

                          <Form.Item rules={[{ required: true }]}  name ="lastName">
                                      <Input placeholder="Last Name" 
                                      id='lastName' enterButton />
                          </Form.Item>

                          <Form.Item rules={[{ required: true }]}  name ="email">
                                      <Input placeholder="email" 
                                      id='email' enterButton     />
                          </Form.Item>

                          <Form.Item name="phone1"  placeholder=" Phone Number 1"  rules={[{ required: true, message: 'Please input your phone number!' }]}>
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                          </Form.Item>
                          
                          <Form.Item name="phone2"  placeholder=" Phone Number 2"  rules={[{ required: true, message: 'Please input your phone number!' }]}>
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                          </Form.Item>

                          <Form.Item rules={[{ required: true }]}  name ="state">
                                      <Input placeholder="State" 
                                        id='state' enterButton    />
                          </Form.Item>

                          <Form.Item rules={[{ required: true }]}  name ="zip">
                                      <Input placeholder="zip" 
                                        id='Zip' enterButton    />
                          </Form.Item>
                            
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                  <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                      Submit
                                  </Button>
                                  </Form.Item>

                            </Form>
                          
                        </div>
                    </div>     
            </div>
        </div>
      </div>
    </>
        )
    }
}


const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       refreshCart: (token) => dispatch(fetchCart(token))
//     };
//   };

  
  export default connect(
    mapStateToProps,
    null
  )(CheckoutPage);
  