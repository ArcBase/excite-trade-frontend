import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";


class ProfileDashboard extends Component {
 
    // The User Proifle State
    state = {
        profile : [] ,
        profile_id : [],
        membership : [], 
        chartData : [],
        loading : false ,
        error : null , 
        post_views_x : [],
        post_name_y :[] ,
        average_views : [],
        user_post : [], 
          }
    
      
     Analysis = async(token) =>{
      const Data_Labels = []
      const Data_Points = []
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(Post_Analytics_url)
      .then(
          res =>{
           const Fetched_Data = res.data
            const New_Data ={
             'Labels': res.data.PostLabels,
             'Points': res.data.PostViews,
           }
           
            this.setState({
              chartData:{
                labels: Fetched_Data.PostLabels,
                datasets:[
                  {
                    label:'Impressions',
                    data: Fetched_Data.PostViews ,
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                    ]
                  }
                ]
              }
            })
             console.log('Analysis',New_Data)
          } )
      
      }


      

    componentDidMount(){
      //this.test_ws()
       
        this.Analysis(this.props.token)
         
       }
    
   

      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            
            this.Analysis(newProps.token)
            
          }
        }
      }
  
    
    
    render() {
       
      
      
        const {profile , average_views  , membership , user_post} = this.state
        if (profile.Edited == false){

        }
  
        return (

          
            <>

         

              <TemporaryDrawer />

          
                <div className="flex-container">
                  
                <div className="shift20">
                          <div className="top-card">
                              
                          <div className="top-card-title">
                              <h3 className="top-card-title">
                                Account Type
                              </h3>
                          </div>
                            <div className="top-card-text">
                                {membership.membership}   
                            </div>  
                            <a href>
                        Click
                        </a>
                          </div>
                      </div>

                  <div className="shift20">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Inmpressions
                          </h3>
                      </div>
                        <div className="top-card-text">
                            
                        </div>
                      </div>
                  </div> 

                  <div className="shift20">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Post
                          </h3>
                      </div>
                        <div className="top-card-text">
                        <a href>
                        View Your Post 
                        </a>
                        </div>
                      </div>
                  </div>

                  <div className="shift20">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Upgrade Membership
                          </h3>
                      </div>
                        <div className="top-card-text">
                        <a href>
                        Click
                        </a>
                        </div>
                      </div>
                  </div>

                </div>   


               

                <div className="flex-container">
                    
                    <div className="shift20">
                    
                    <div className="snip1336 ">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87" />
                    <figcaption>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
                       alt="profile-sample4" className="profile" />
                      <h2>
                          James Bronw
                      </h2>
                      <p>
                      Boy you are good to me
                      </p>
                      <a href="/edit_profile/" className="follow">
                        Edit Profile
                      </a>
                      <a href="#" className="info">More Info</a>
                    </figcaption>
                  </div>
                      </div>
                      
                  
                    <div className="shift50">
               
                    <div 
                   className="base-card ">
                   <Line
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
    };

};

const mapStateToProps = state => {
    return {
      token: state.auth.token 
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(ProfileDashboard);