import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from "axios";
import {message, notification} from 'antd'

const Check_Vendor_url = 'htttp://127.0.0.1:8000/api/f-check/'
class verification extends Component {

    state={
      vendor_data:[],
      loading : true ,
      error : null,
    }

    Check_Vendor_Edited_Mode = async()=>{
      await axios.get(Check_Vendor_url)
      .then(res=>{
        this.setState({
          vendor_data : res.data[0] ,
          loading : false
        })
      })
    }

    componentDidMount() {
      if (this.props.token !== undefined && this.props.token !== null) {

        this.Check_Vendor_Edited_Mode(this.props.token)

      }
    }

    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
            this.Check_Vendor_Edited_Mode(newProps.token);

        }
      }
    }


    render() {
        return (
            <div>
                  <p>
1qw
                  </p>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };

 const mapDispatchToProps = dispatch => {
  return {
   // refreshCart: () => dispatch(fetchCart())
  }
};

export default connect(
    mapStateToProps,
    null
  )(Verificaion);


export default Verification
