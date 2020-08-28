import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
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
const Search = Input.Search;
const TextArea = Input.TextArea;
const { Option } = Select;
const { RangePicker } = DatePicker;

class OrderPage extends Component {
  state = {
    data: [],
  };

  handleSubmit = (values) => {
    const Quantity = values["Quantity"];
    const Weight = values["Weight"];
    const DeliveryLocation = values["DeliveryLocation"];
    const PortLocation = values["PortLocation"];
    const PortType = values["PortType"];

    let form_data = new FormData();
    form_data.append("Quantity", Quantity);
    form_data.append("Weight", Weight);
    form_data.append("DeliveryLocation", DeliveryLocation);
    form_data.append("PortLocation", PortLocation);
    form_data.append("PortType", PortType);

    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Token ${this.props.token}`,
    // };
    // const id = this.props.match.params.OrderID;
    // axios
    //   .post('', form_data)
    //   .then((res) => {
    //     this.setState({ loading: false, success: true, data: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false, error: err });
    //   });
  };

  render() {
    const { data, error, loading, success } = this.state;
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
      <div className="w-full md:w-6/12 py-4 px-4 mr-auto ml-auto">

      <Form onFinish={this.handleSubmit}>
                <Form.Item>
                <h1 className="ant-form-text">Order Form</h1>
                </Form.Item>

                <Form.Item rules={[{ required: true }]} name="Quantity">
                <Input placeholder="Billin Address" enterButton />
                </Form.Item>

                <Form.Item rules={[{ required: true }]} name="Weight">
                <Input placeholder="Weight" enterButton />
                </Form.Item>

                <Form.Item rules={[{ required: true }]} name="DeliveryLocation">
                <Input placeholder="Delivery Address" nterButton />
                </Form.Item>

                <Form.Item rules={[{ required: true }]} name="PortLocation">
                <Input placeholder="Port Locatiion" enterButton />
                </Form.Item>

                <Form.Item rules={[{ required: true }]} name="PortType">
                <Input placeholder="Port Type" enterButton />
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

//   const mapDispatchToProps = dispatch => {
//     return {
//       refreshCart: (token) => dispatch(fetchCart(token))
//     };
//   };

export default connect(mapStateToProps, null)(OrderPage);
