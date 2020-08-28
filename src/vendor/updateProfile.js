import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { vendorUpdateURL } from "../constants"
import {Row, Col , List, Avatar ,Rate,Input,Spin ,Card , Form, Button ,Select , DatePicker , Upload, message,notification} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined ,UploadOutlined  } from '@ant-design/icons'
import axios from "axios";

class ProfileUpdate extends Component{

  state = {
    image : null
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };
  
  handleVendorSubmit = (values) => {

    console.log(this.state);

    const firstName = values['firstName']
    const lastName  = values['lastName']
    const phone = values['phone']
    const store_name = values['store_name']
    const address1 = values['address1']
    const address2 = values['address2']
    const city = values['city']
    const profilePicture = values['profilePicture']
    const store_location = values['store_location']

    let form_data = new FormData();
    form_data.append('firstName', firstName)
    form_data.append('lastName', lastName)
    form_data.append('phone', phone)
    form_data.append('store_name', store_name)
    form_data.append('address1', address1)
    form_data.append('address2', address2)
    form_data.append('city', city)
    form_data.append('profilePicture', this.state.image, this.state.image.name)
    form_data.append('store_location', store_location)

    console.log(this.props.username)
    axios.post(vendorUpdateURL, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${this.props.token}`
      }
    }).then(res => {
          console.log(res.data);
         this.props.history.push("/farmer-dashboard")
        })
        .catch(err => console.log(err))
  };

  handleCustomerSubmit = (values) => {

    console.log(this.state);

    const firstName = values['firstName']
    const lastName  = values['lastName']
    const phone = values['phone']
    const store_name = values['store_name']
    const address1 = values['address1']
    const address2 = values['address2']
    const city = values['city']
    const profilePicture = values['profilePicture']
    const store_location = values['store_location']

    let form_data = new FormData();
    form_data.append('firstName', firstName)
    form_data.append('lastName', lastName)
    form_data.append('phone', phone)
    form_data.append('store_name', store_name)
    form_data.append('address1', address1)
    form_data.append('address2', address2)
    form_data.append('city', city)
    form_data.append('profilePicture', this.state.image, this.state.image.name)
    form_data.append('store_location', store_location)

    console.log(this.props.username)
    axios.post(vendorUpdateURL, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${this.props.token}`
      }
    }).then(res => {
          console.log(res.data);
         this.props.history.push("/")
    }).catch(err => console.log(err))
  };


  render(){
    return(

      <div className="container  my-10">

        <div className="flex flex-wrapper">

          <div className="base-card">

          {
            this.props.seller ? (
              <React.Fragment>
                <Form  onFinish={this.handleVendorSubmit}>
                    <Form.Item>
                      <h1 className="ant-form-text">Create Post</h1>
                      </Form.Item>

                   <Form.Item rules={[{ required: true }]}  name ="firstName">
                              <Input placeholder="First Name" id='firstName' enterButton  />
                   </Form.Item>

                   <Form.Item rules={[{ required: true }]}  name ="lastName">
                              <Input placeholder="Last Name" id='lastName' enterButton />
                   </Form.Item>

                   <Form.Item rules={[{ required: true }]}  name ="phone">
                              <Input placeholder="Phone Number" id='phone' enterButton />
                   </Form.Item>
                   <Form.Item rules={[{ required: true }]}  name ="store_name">
                              <Input placeholder="store_name" placeholder="Store Name" enterButton id='store_name' />
                   </Form.Item>

                   <Form.Item rules={[{ required: true }]} name="address1">
                        <Input name="address1" placeholder="Address 1" id="address1" />
                    </Form.Item>

                    <Form.Item rules={[{ required: true }]} name="address2">
                         <Input name="address2" placeholder="Address 2" id="address2" />
                     </Form.Item>

                     <Form.Item rules={[{ required: true }]} name="city">
                          <Input name="city" placeholder="City" id="city" />
                      </Form.Item>

                      <Form.Item rules={[{ required: true }]} name="store_location">
                           <Input name="store_location" placeholder="Store Location"  id="store_location" />
                       </Form.Item>

                       <Form.Item rules={[{ required: true }]} name="profilePicture">
                            <Input  type="file" name="profilePicture" id="profilePicture" onChange={this.handleImageChange} />
                       </Form.Item>

                      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                Submit
                          </Button>
                      </Form.Item>

                     </Form>
              </React.Fragment>
            ): <React.Fragment>
            <Form  onFinish={this.handleCustomerSubmit}>
                <Form.Item>
                  <h1 className="ant-form-text">Create Post</h1>
                  </Form.Item>

               <Form.Item rules={[{ required: true }]}  name ="firstName">
                          <Input placeholder="First Name" id='firstName' enterButton  />
               </Form.Item>

               <Form.Item rules={[{ required: true }]}  name ="lastName">
                          <Input placeholder="Last Name" id='lastName' enterButton />
               </Form.Item>

               <Form.Item rules={[{ required: true }]}  name ="phone">
                          <Input placeholder="Phone Number" id='phone' enterButton />
               </Form.Item>

               <Form.Item rules={[{ required: true }]} name="address1">
                    <Input name="address1" placeholder="Address 1" id="address1" />
                </Form.Item>

                <Form.Item rules={[{ required: true }]} name="address2">
                     <Input name="address2" placeholder="Address 2" id="address2" />
                 </Form.Item>

                 <Form.Item rules={[{ required: true }]} name="city">
                      <Input name="city" placeholder="City" id="city" />
                  </Form.Item>

                   <Form.Item rules={[{ required: true }]} name="profilePicture">
                        <Input  type="file" name="profilePicture" id="profilePicture" onChange={this.handleImageChange} />
                   </Form.Item>

                  <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                      <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            Submit
                      </Button>
                  </Form.Item>

                 </Form>
              </React.Fragment>
          }

          </div>

        </div>

      </div>

    )
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
      seller: state.auth.is_seller,

    };
  };

// const mapDispatchToProps = dispatch => {
//     return {
//       createPOST: (token,poster) => dispatch(createProduct(token, poster))
//     };
// };

export default connect(
    mapStateToProps,
   null
 )(ProfileUpdate);
