import React, {Component, Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import ProductList from '../shop/OrderSummary'
import { farmerlist, vendorProducts } from "../constants";
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

import ProfileUpdate from './updateProfile'
import TemporaryDrawer from './sideBar'
import AnalysisReport from './analysis'
//
import { Statistic, Row, Col, Button, Card , Descriptions, Avatar} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, LikeOutlined,ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Meta } = Card;



const Check_Vendor_url = 'htttp://127.0.0.1:8000/api/f-check/'

class FarmerDashboard extends Component {
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
          console.log(this.state.vendor_data);
          
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
          .get(vendorProducts)
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

render() {

      const {data, logistics, products, vendor_data} = this.state;
      console.log(vendor_data);
      const {info, username,name, phone,address,image,verified} = this.props
      console.log(image);
      console.log(products);
      const edited_profile = vendor_data['edited']
      console.log( this.state.vendor_data['edited']);
      

return (
        <>
        <TemporaryDrawer />

        {edited_profile ? 
        
          <Fragment>
          <div
          style={{paddingLeft:20}}
            className="container">

            <div className="grid grid-cols-4">
            <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                    <div className="top-card">

                    <div className="top-card-title">
                        <h3 className="top-card-title">
                          Account Type
                        </h3>
                    </div>
                      <div className="grid grid-cols-2">
                      <div className="top-card-text col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                          TEXT
                      </div>
                      
                      </div>
                    </div>
                </div>

            <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                <div className="top-card">

                <div className="top-card-title">
                    <h3 className="top-card-title">
                      Inmpressions
                    </h3>
                </div>
                  <div className="top-card-text">
                    10 views
                  </div>
                </div>
            </div>

            <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                <div className="top-card">

                <div className="top-card-title">
                    <h3 className="top-card-title">
                      Post
                    </h3>
                </div>
                  <div className="top-card-text">
                  <a href={`/user_post`}>
                  View Your Post
                  </a>
                  </div>
                </div>
            </div>

            <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                <div className="top-card">

                <div className="top-card-title">
                    <h3 className="top-card-title">
                      Quotes
                    </h3>
                </div>
                  <div className="top-card-text">
                  <a href={`/vendor_quotes/`}>
                  Click
                  </a>
                  </div>
                </div>
            </div>

            </div>

          </div>

            <div className="container mx-auto">
            <div className="grid grid-cols-6">

              <div className=" sm:col-span-6 sm:mx-auto md:col-span-6 lg:col-span-2 xl:col-span-2">

                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src={vendor_data.profilePicture}
                    />
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
                </div>

              <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                <div className="">
                <AnalysisReport />
                </div>
              </div>

          </div>
        </div>
          </Fragment>
         :
          <ProfileUpdate />
          }


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
)(FarmerDashboard);
