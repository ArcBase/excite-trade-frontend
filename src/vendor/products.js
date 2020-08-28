import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import ProductList from '../shop/OrderSummary'
import { farmerlist } from "../constants";
import axios from "axios";
import { connect } from "react-redux";
import * as information from "../store/actions/vendor"
import {message, notification} from 'antd'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import TemporaryDrawer from './sideBar'


const Check_Vendor_url = 'htttp://127.0.0.1:8000/api/f-check/'
class FarmerProducts extends Component {
    state = {
        collapsed: false,
        Fdata: [],
        vendor_data :[],
        logistics: [],
        products: []
      };

      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

      //CHECKS IF VENDOR IS Verified

      Check_Vendor_Edited_Mode = async(token)=>{
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
        await axios.get(Check_Vendor_url)
        .then(res=>{
          this.setState({
            vendor_data : res.data[0] ,
            loading : false
          })
          //Perform condition
          const verify = this.state.vendor_data['edited']
          if (verify == false){
            message.error('Complete Your data', 100)

          }

        })

      }
      //ENDS HERE

      getFarmersProducts = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get('htttp://127.0.0.1:8000/api/f-items-list/')
          .then(res => {
            this.setState({ products: res.data, loading: false });
            console.log(this.state.products);

          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);

          });
      }

      componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.props.farmerInfo(this.props.token, this.props.userId)
          this.getFarmersProducts(this.props.token)
          this.Check_Vendor_Edited_Mode(this.props.token)

        }
      }

      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.props.farmerInfo(newProps.token, newProps.userId)
            this.getFarmersProducts(newProps.token)
            this.Check_Vendor_Edited_Mode(newProps.token)

          }
        }
      }

      createData =(name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
      }

render() {
      const {data, logistics, products, vendor_data} = this.state;
      console.log(vendor_data);
      const {info, username,name, phone,address,image,verified} = this.props
      console.log(products);

    const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )


return (
        <>
        <TemporaryDrawer />
    <div className="container mx-auto">

    <div className="  w-full md:w-8/12 ml-auto py-4 mr-auto px-4">

        <div className="base-card">

                <List itemLayout="vertical"
                  size="large"
                  pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 3,
                  }}
                  dataSource={products}
                  footer={
                  <div>
                    <b>VENDOR PRODUCTS</b>
                  </div>
                  }
                  renderItem={item => (
                  <List.Item
                    key={item.title}
                    // actions={[
                    //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    // ]}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src={item.image}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                  )}
        />
        </div>

    </div>

  {/*  */}
    </div>


        </>
        )
    }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    username: state.vendor.username,
    name:state.vendor.name,
    phone:state.vendor.phone,
    address:state.vendor.address,
    image:state.vendor.image,
    verified:state.vendor.verified,
    info: state.vendor.info
  };
};

const mapDispatchToProps = dispatch => {
  return {
    farmerInfo: (token, userId) => dispatch(information.FarmerDetails(token,userId))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FarmerProducts);
