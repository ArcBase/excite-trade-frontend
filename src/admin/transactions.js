import React, { Component } from 'react'
import { connect } from "react-redux";
import {transactions} from '../constants'
import axios from "axios";
import CustomPaginationActionsTable from './comps/transactions'

class Transactions extends Component {

    state = {
        data: []
    }

    fecthTransactions = (token) => {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
          axios.get(transactions)
          .then(res =>{
            this.setState({
              data:res.data
            })
          })
          .catch(err=>{
              console.log(err);              
          })
    }

    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
            this.fecthTransactions(this.props.token)
          }
    }

    componentWillReceiveProps(newProps){
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
             this.fecthTransactions(newProps.token)
            }
          }
    }

    render() {

        const {data} = this.state
       // console.log(data);
        
        
        
        return (
            <div className="container mx-auto my-10">
                <CustomPaginationActionsTable data={data} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       refreshCart: (token) => dispatch(fetchCart(token))
//     };
//   };
  
  export default connect(
    mapStateToProps,
    null
  )(Transactions);
  