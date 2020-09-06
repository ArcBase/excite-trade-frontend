import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {} from "antd";
import moment from "moment";

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
import Nav from '../navbar'
import Footer from './footer'
const { TabPane } = Tabs;

const Search = Input.Search;
const TextArea = Input.TextArea;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const host = "https://trade-backn.herokuapp.com";

class ProductDetailTwo extends Component {
  state = {
    loading: false,
    error: null,
    data: [],

    tradeProductsDetail: [],
  };

  getProductDetails = async () => {
    const productID = this.props.match.params.productID;
    const endpoint = host + `/marketplace/product-detail/${productID}`;
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        this.setState({
          data: res.data,
        });
      } else {
        {
        }
      }
    });
  };
 
  //Gets the List of Payments from the Server
  getPayments = async () => {
    const endpoint = host;
  };

  createOrder = async (values) => {
    const productID = this.props.match.params.productID;
    const endpoint = host + `/buyer/create-order/${productID}/1/`;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };

    const Quantity = values["Quantity"];
    const Weight = values["Weight"];

    const DeliveryDate = values["DeliveryDate"];
    const DeliveryType = values["DeliveryType"];

    const PortLocation = values["PortLocation"];
    const PortType = values["PortType"];

    let fd = new FormData();
    fd.append("Quantity", Quantity);
    fd.append("Weight", Weight);
    fd.append("DeliveryDate", DeliveryDate);
    fd.append("DeliveryType", DeliveryType);
    fd.append("PortLocation", PortLocation);
    fd.append("PortType", PortType);

    await axios.post(endpoint, fd).then((res) => {
      if (res.status == 200) {
        message.success("Order Created");
      } else {
        message.error("Order Failed");
      }
    });
  };

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
    const {token} = this.props
    return (

        <div className="product-detail-container">
            <Nav/>
            <div className="m-container">
                  <div className="product-detail-box">
        <div className="product-detail-box-1">
            <img src={data.Image} />
        </div>
        <div className="product-detail-box-2">
            <h2><b>Descriptions</b></h2>
            <p>
            Whether you want to purchase Zinc ore, Zinc concentrates, or Sphalerite as you may know it and have it shipped to any port around the world, our world-class
             team is built to help you close fast, safe, and profitable transactions on time, every time! </p>
             <ul>
                 <li>Origin: Nigeria</li>
                <li>Mineral Type: Lead Ore / Lead Concentrates</li>
                <li>Physical Specification: Based On Buyer's Specification</li>
                <li>Quantity: Based On Buyer’s Specification</li>

             </ul>
             <p> Origin: Nigeria Mineral Type:{data.Name}</p>
                  <p> Physical Specification: Based On Buyer's Specification</p>                 
                  <p> Quantity: Based On Buyer’s Specification Price: Negotiable</p>
                  <p> Metric Tonne Trade Process: Ex Works/FOB/CIF Payment Method:</p>
                  <p> 100% irrevocable SBLC or L/C at sight from a top 25 prime bank</p>
                  <p> Shipping Time: 15 days after confirmation of L/C Loading Port:</p>
                  <p> Lagos, Nigeria</p>
        </div>

        <div className="product-detail-box-form">

        {
          token ? (
            <Form onFinish={this.createOrder}>
            <Form.Item>
              <h1 className="order-h1">Order Form</h1>
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
              label="Delivery Port"
            >
            <Select
             name="PortType"
            defaultValue="local"
            placeholder="Port Type"
            >
              <Select.Option value="international">International</Select.Option>
              <Select.Option value="local">Local</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
          nname = 'DeliveryType'
           label="Delivery Type"
          >
            <Select
              name="Delievery Type"
              defaultValue="fob"
            >
              <Select.Option value="fob">FOB - Free On Board</Select.Option>
              <Select.Option value="pickup">Pick Up</Select.Option>
            </Select>
          </Form.Item>

            <Form.Item
             label=""
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

          ): (
          <p className="product-text-black">Please <a className="product-text-link" href="/login">login</a> to make place an Order</p>
          )
        }

        </div>
      </div>

    </div>
        <Footer />
        </div>

    );
  }
}



const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};



export default withRouter(
  connect(mapStateToProps, )(ProductDetailTwo)
);