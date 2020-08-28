import React from "react";
import {
  Form,
  Select,
  InputNumber,
  Input,
  Radio,
  Button,
  DatePicker,
  Spin
} from "antd";
import axios from "axios";

const Search = Input.Search;
const { Option } = Select;
const { RangePicker } = DatePicker;

class FilterForm extends React.Component {
  state = {
    results: [],
    loading: false,
    error: null
  };

  handleSubmit = (values, err) => {
    
      const category =
        values["category"] === undefined ? null : values["category"];
      const view_count_max =
        values["maximum-views"] === undefined ? null : values["maximum-views"];
     

      this.setState({ loading: true });

      if (!err) {
        axios
          .get("http://127.0.0.1:8000/api/", {
            params: {
             
            }
          })
          .then(res => {
            this.setState({
              loading: false,
              results: res.data
            });
          })
          .catch(err => {
            this.setState({ error: "There was an error" });
            console.log(err);
          });
        console.log("Received values of form: ", values);
      }
    
  };

  render() {
    const { error, loading, results } = this.state;
    
    
    const formItemLayout = {
      wrapperCol: { span: 12, offset: 6 }
    };
    return (
      <div >
        {error && <span>There was an error</span>}

        <Form 
      onFinish={this.handleSubmit}  >   
      <Form.Item name="Name" >
        <Input placeholder="Product Name"/>
      </Form.Item>

      <Form.Item>
      <Select >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
      </Form.Item>


  <Form.Item>
  <Button htmlType="submit" type="primary">
    Filter
  </Button>
  </Form.Item>
        </Form>

       
      </div>
    );
  }
}



export default FilterForm;
