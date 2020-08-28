import React from "react";
import { connect } from "react-redux";
import { productListURL, addToCartURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import { endpoint } from "../constants";
import axios from "axios";
import { Card,Form, Select ,Input ,Button, Radio, Icon } from 'antd';


class Farmers_Product extends React.Component{
    state = {
        loading: true
    }

    fetchList = (token) =>{
        this.setState({ loading: true });
        this.props.refreshCart(token)
          this.setState({ loading: true });
        axios
          .get(productListURL)
          .then(res => {
            this.setState({ data: res.data, loading: false });
          }).catch(err => {
            this.setState({ error: err, loading: false });
          });
      }

      
      componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.fetchList(this.props.token);
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.fetchList(newProps.token);
          }
        }
      }
    

    render(){
        return(
            <>

                <div className="grid grid-cols-6 gap-2">
                           {data.map((item) => ( 
                        <React.Fragment>
                        <div className="col-span-2 ">
                          <div className="p-2">
                          <div className="max-w-screen-sm mx-auto rounded overflow-hidden shadow-lg">
                            <img className="w-full img-h" src={item.image}  />
                              <div className="px-6 py-4">
                              <div className="font-bold text-xl mb-2">{item.title} - {item.price}</div>
                              
                            </div>
                            <div class="px-6 py-4">
                                      <span class="inline-block bg-red-900  ptext-sm font-semibold mr-2">
                                        <button className=" hover:bg-blue-700 text-white font-bold py-2 px-4"
                                         onClick={() => this.handleAddToCart(item.slug)}>
                                          Add to cart
                                        </button>
                                      </span>

                                      <span class="inline-block bg-red-900 text-sm font-semibold  mr-2">
                                      <a href={`/p-detail/${item.id}`}>
                                        <button className=" hover:bg-blue-700 text-white font-bold py-2 px-10"
                                         >
                                         View
                                        </button>
                                        </a>
                                      </span>
                                    </div>
                          </div>
                          </div>
                        </div>
                        </React.Fragment>

                        ))  
                        }

                  </div>

            </>
        )
    }
    
}


const {Option} = Select 
const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};
export default connect(
  mapStateToProps
)(Farmers_Product);


