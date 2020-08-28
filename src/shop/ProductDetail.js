import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import ProductCard from "./cardDetail";

import { productDetailURL, addToCartURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import { authAxios } from "../utils";
import {} from "antd";
import moment from 'moment'

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
import Nav from "../containers/nav";
const { TabPane } = Tabs;

const Search = Input.Search;
const TextArea = Input.TextArea;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD'

const host = 'https://trade-backkn.herokuapp.com'

class ProductDetail extends React.Component {
  state = {
    loading: false,
    error: null,
    data: [],

    tradeProductsDetail:[],
  };

  // componentDidMount() {
  //   this.handleFetchItem();
  // }

  // handleFetchItem = (token) => {
  //   const {
  //     match: { params },
  //   } = this.props;
  //   const detailID = this.props.match
  //   this.setState({ loading: true });
  //   axios
  //     .get(`https://trade-backkn.herokuapp.com/marketplace/${detailID}`)
  //     .then((res) => {
  //       this.setState({ data: res.data, loading: false });
  //       console.log(this.state.data);
  //     })
  //     .catch((err) => {
  //       this.setState({ error: err, loading: false });
  //     });
  // };

  // handleAddToCart = (slug) => {
  //   this.setState({ loading: true });
  //   axios.defaults.headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${this.props.token}`,
  //   };
  //   axios
  //     .post(addToCartURL, { slug })
  //     .then((res) => {
  //       this.props.refreshCart(this.props.token);

  //       this.setState({ loading: false });
  //     })
  //     .catch((err) => {
  //       if (err.response.staus == 404) {
  //         console.log(err.response);
  //       }
  //       this.setState({ error: err, loading: false });
  //     });
  // };

  getProductDetails = async()=>{
    const productID = this.props.match.params.productID
    const endpoint = host + `/marketplace/product-detail/${productID}`
    await axios.get(endpoint)
    .then(res =>{ 
      if (res.status == 200){
        this.setState({
          data:res.data
        })
      }else{{

      }}
    })
  }

  //Gets the List of Payments from the Server
  getPayments = async()=>{
    const endpoint = host 
  }

  createOrder = async(values)=>{
    const productID = this.props.match.params.productID
    const endpoint = host  + `/buyer/create-order/${productID}/1/` 
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };


    const Quantity = values['Quantity']
    const Weight = values['Weight']

    const DeliveryDate = values['DeliveryDate']
    const DeliveryType = values['DeliveryType']

    const PortLocation = values['PortLocation']
    const PortType = values['PortType']


    let fd = new FormData()
    fd.append('Quantity',Quantity)
    fd.append('Weight' ,Weight)
    fd.append('DeliveryDate',DeliveryDate)
    fd.append('DeliveryType',DeliveryType)
    fd.append('PortLocation',PortLocation)
    fd.append('PortType',PortType)

    await axios.post(endpoint,fd)
    .then(res=>{
      if (res.status == 200){
        message.success('Order Created')
      }else{
        message.error('Order Failed')
      }
    })


  }


  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.getProductDetails(this.props.token);
    } 
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.getProductDetails(newProps.token);
      }
    } 
  }

  render() {
    const { data, error, loading } = this.state;
    const item = data;
    console.log(data);
    return (
      <>
        <Nav/>
        <div className="container mx-auto my-10">
          <div className="grid grid-cols-6 gap-4">
            <div className="sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
              <div className="">
                <img
                  className="post_detail_image ml-auto mr-auto shadow-lg"
                  alt="Image Appears here"
                  style={{ height: "400px" }}
                  src={data.Image}
                />
              </div>
            </div>
            <div className="sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-2">
              <ProductCard
                data={data}
                oncl={() => this.handleAddToCart(data.slug)}
              />
            </div>

            <div className="col-span-12 my-10">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Order" key="1">
                  <div className="order-page-form">
                    <Form onFinish={this.createOrder}>
                      <Form.Item>
                        <h1 className="ant-form-text">Order Form</h1>
                      </Form.Item>

                      <Form.Item rules={[{ required: true }]} name="Quantity">
                        <Input placeholder="Quantity" enterButton />
                      </Form.Item>

                      <Form.Item rules={[{ required: true }]} name="Weight">
                        <Input placeholder="Weight in tonnes" enterButton />
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true }]}
                        name="DeliveryDate" label="Deliver Before"
                      >
                            <DatePicker defaultValue={moment('2020/01/01',dateFormat)} 
                           format ={dateFormat} 
                           />
                      </Form.Item>

                      <Form.Item 
                      name="PortType"
                      placeholder="Port Type"
                      >
                      <Select>
                        <Select.Option value="international">International</Select.Option>
                        <Select.Option value="local">Local</Select.Option>
                      </Select>
                    </Form.Item>


                      <Form.Item
                        rules={[{ required: true }]}
                        name="PortLocation"
                      >
                        <Input placeholder="Port Locatiion" enterButton />
                      </Form.Item>

                     

                    

                      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={this.handleSubmit}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </TabPane>

                <TabPane tab="Description " key="2">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12">
                      <div className="description-card">
                        <div className="description-header">
                          <div className="card-body">
                            <h3>Devlivery Information & Policy</h3>
                            <p>
                              Normally delivered between Thursday 14 May and
                              Monday 18 May. Please check exact dates in the
                              Checkout page.See more
                            </p>
                            <h4>Return Policy</h4>
                            <p>
                              Free return within 15 days for Jumia Mall items
                              and 7 days for other eligible items.
                            </p>
                          </div>
                        </div>
                        <div className="description-card-text">
                          Descriptioln
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="DELIVERY & RETURNS" key="2">
                  <div className="card-container">
                    <div className="card-body">
                      <h3>Devlivery Information & Policy</h3>
                      <p>
                        Normally delivered between Thursday 14 May and Monday 18
                        May. Please check exact dates in the Checkout page.See
                        more
                      </p>
                      <h4>Return Policy</h4>
                      <p>
                        Free return within 15 days for Jumia Mall items and 7
                        days for other eligible items.
                      </p>
                    </div>
                  </div>
                </TabPane>

                <TabPane tab="SPECIFICATIONS" key="3">
                  <div className="card-container">
                    <div className="card-body">
                      <h3>Specfications</h3>
                      <p>
                        Normally delivered between Thursday 14 May and Monday 18
                        May. Please check exact dates in the Checkout page.See
                        more
                      </p>
                      <h4>Return Policy</h4>
                      <p>
                        Free return within 15 days for Jumia Mall items and 7
                        days for other eligible items.
                      </p>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshCart: (token) => dispatch(fetchCart(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
