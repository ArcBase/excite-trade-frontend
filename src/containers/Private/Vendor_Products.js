import React, { Component } from 'react'

import * as information from "../store/actions/vendor"
import { Link, withRouter } from 'react-router-dom';
//import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";

my_products_url = 'https://trade-backn.herokuapp.com/api/f-list'
class Famer_Products extends Component{

    state = {
        products : [] ,
        loading : true
    }

    My_Products = () =>{
        axios.get(my_products_url)
        then(res =>{
            //this
        })
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }
    render(){
        return(
            <div className="container">
                <div className="grid grid-cols-12">

                        <div className="col-span-5">

                        </div>

                        <div className="col-span-7">

                        </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
    
    };
  };

  
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Famer_Products)
  );
  