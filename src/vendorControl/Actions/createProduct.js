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
  const TextArea = Input.TextArea

  const host = 'https://trade-backn.herokuapp.com'

class createProduct extends Component {
  state = {
    vendorProducts :[],
    categories: [],
    ImageFile : [],
  };

  
  handleImageChange = (e) => {
    this.setState({
        ImageFile: e.target.files[0]
    })
  };

  getCategories = async()=>{
    const endpoint = host + `/marketplace/category-list/`
    
    await axios.get(endpoint)
    .then(res=>{
        if (res.status == 200){
            this.setState({
                categories:res.data
            })
        }
    })
  }

  

  productCreation = async(values)=>{
    const endpoint = host + `/vendor/create-product/`

      const productName = values['ProductName']
      const theTitle = values['Title']
      const theDescription = values['Description']
      const theWeight = values['Weight']
      const ProductImage = this.state.ImageFile
  

        let fd = new FormData()
        fd.append('productName' ,productName)
        fd.append('Title',theTitle)
        fd.append('Description',theDescription)
        fd.append('Weight',theWeight)
        fd.append('ProductImage',ProductImage)
        
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`,
          };
        await axios.post(endpoint ,fd)
        .then(res =>{
            if (res.status == 200){
                message.success('Product Created Succuessfully')
                this.props.history.push('/vendor/dashboard')
            }else{
                message.error('Error creating products')
            }
        })

  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
        // this.getCategories(this.props.token)
    }
    this.getCategories(this.props.token)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        // this.getCategories(newProps.token)
      }
      this.getCategories()
    } 
  }


  render() {
    const  {vendorProducts ,categories ,ImageFile} = this.state
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
                                Create Product
                                </h3>

                                <div className="">
                                <Form className="form-box-width"
                                             onFinish={this.productCreation}>

                                        
                                    <Form.Item name="Category"
                                         rules={[{ required: true }]}>
                                             <Select placeholder="Select Condition">
                                                    {
                                                    categories.map((c)=>(
                                                        <Option 
                                                        value={c.id}>{c.CategoryName}</Option>
                                                    ))
                                                }
                                                
                                                        </Select>
                                        </Form.Item>

                                         <Form.Item 
                                         rules={[{ required: true, message:'First Name is required' }]}
                                         name ="ProductName">
                                         <Input
                                         size="large"
                                         placeholder="Product Name" />
                                         </Form.Item>

                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="Title">
                                         <Input
                                         size="large"
                                         placeholder="Title" />
                                         </Form.Item>

                                
                                         <Form.Item 
                                            rules={[{ required: true }]}
                                            name="Description">
                                        <TextArea 
                                            placeholder="Description" rows={4} />
                                        </Form.Item>

                                         <Form.Item 
                                         rules={[{ required: true,  }]}
                                         name ="Weight">
                                         <Input
                                         size="large"
                                         placeholder="Weight" />
                                         </Form.Item>


                                        
                                        <Form.Item 
                                        rules={[{ required: true }]}
                                        name="productImage">

                                        <Input  type="file"
                                      
                                            onChange={this.handleImageChange}
                                        name="Post_Image1" />

                                        </Form.Item>

                                       
                                         <Form.Item >
                                           <button
                                             class="custom-button"
                                           htmlType="submit">
                                             Create Product
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
    mapStateToProps,)(createProduct)