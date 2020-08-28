import React, { Component } from 'react';
import { notification } from 'antd';
import axios from 'axios'
//import the library
import PaystackButton from 'react-paystack';

const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg ,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

class Paystacker extends Component {

    get_price = this.props.price

    state = {
        key: "pk_test_96deeb613ab8f21138a6d59a1740cb3a3a1bacff", //PAYSTACK PUBLIC KEY
        email: "foobar@example.com",  // customer email
        amount: this.get_price * 100 //equals NGN100,
    }

    callback = (response) => {
        console.log(response); // card charged successfully, get reference here
        openNotification('card charged successfully, get reference here')
        const order_id = this.props.order_id
        const refrence_code = response['reference']
        const transaction_code = response['trans']
        const trxref = response['trxref']
        const Price = this.state.amount
        axios.get('http://127.0.0.1:8000/api/store_transaction/',{
            params :{
                order_id, refrence_code, transaction_code, trxref , Price
            }
        })
        .then(res =>{
            openNotification(res.data['Message'])
        })
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    render() {
        
    return (
        <div>
        <p>
            <PaystackButton
            text="Make Payment"
            className="payButton"
            callback={this.callback}
            close={this.close}
            disabled={true} 
            embed={true}
            reference={this.getReference()}
            email={this.state.email}
            amount={this.props.price}
            paystackkey={this.state.key}
            tag="button"
            />
        </p>
        </div>
    );
    }
}

export default Paystacker;