import React,{Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import {notification,message, Statistic} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const Product_Analysis = 'https://trade-backn.herokuapp.com/api/admin-product-rank/'

class ProductAnalysisReport extends Component{
  state = {
    chartData: [],
  }

  Analysis = async(token) =>{
          const Data_Labels = []
          const Data_Points = []
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          await axios.get(Product_Analysis)
          .then(
              res =>{
               const Fetched_Data = res.data
               console.log(Fetched_Data);
                const New_Data ={
                 'Labels': res.data.postLabels,
                 'Points': res.data.postViews,
               }
            console.log(New_Data);
            
             console.log(res.data);
                this.setState({
                  chartData:{
                    labels: Fetched_Data.postLabel,
                    datasets:[
                      {
                        label:'Impressions',
                        data: Fetched_Data.postView,
                        backgroundColor:[
                          'rgb(148,0,211)'
                    ]
                  }
                ]
            }
        })
            console.log('Analysis',New_Data)
      } )
  }

  componentDidMount(){
            if (this.props.token !== undefined && this.props.token !== null) {
              this.Analysis(this.props.token)
      }
  }

    componentWillReceiveProps(newProps){

      if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
                this.Analysis(newProps.token)
          }
        }
    }

  render(){

    console.log(this.state.chartData);

      return(

          <>
          <div className="">
           <div className=" w-full md:w-12/12 ml-auto py-4 px-4 ">
             <div
          className="base-card">
          <Bar
                className =""
                data={this.state.chartData}
                options={{
                 responsive: true,
                maintainAspectRatio : true,
                title:{
                display:this.props.displayTitle,
                text:'Largest Cities In '+this.props.location,
                fontSize:25
                },
                legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition

                }
                }}
           />
          </div>
             </div>
         </div>
          </>

            )
          }

}



const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     farmerInfo: (token, userId) => dispatch(information.FarmerDetails(token,userId))
//   };
// };


export default connect(
  mapStateToProps,
  null
)(ProductAnalysisReport);
