import React from "react";
import { connect } from "react-redux";
import CardList from './cardList'
import ResulstList from './filterResults'

import { productListURL, addToCartURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import { endpoint } from "../constants";
import axios from "axios";
import { Card,Form, Select ,Input ,Button, Radio, Icon , notification} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import FilterForm from '../containers/Filter'

import Nav from '../containers/nav'

const { Meta } = Card;
const Search  = Input.Search
const {Option} = Select

const openNotification = (msg) => {
  notification.open({
    message: 'Cart Notofication',
    description: msg
  });
};

const host = 'https://trade-backkn.herokuapp.com'


class ProductList extends React.Component {

  state = {
    results_loading : false ,
    search_results : [] ,
    categories : [] ,
    loading: false,
    error: null,
    data: [],
    mm: [],
    size: 'large',


    tradeProductsList: [],
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  fetchList = () =>{
      this.setState({ loading: true });
      axios
      .get('https://trade-backkn.herokuapp.com/marketplace/product-list/')
      .then(res => {
        this.setState({ data: res.data, loading: false });
      }).catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  Fetch_Categories = () =>{
    const category_url = 'https://trade-backkn.herokuapp.com/api/product_filter/category/';
      axios.get(category_url)
      .then(res =>{
        this.setState({
          categories:res.data
        })
        console('The Categories include',this.state.categories)
      })

  }


  getProducts = async()=>{
    const endpoint = host + '/market/product-list/'
    await axios.get(endpoint)
    .then(res =>{ 
      if (res.status == 200){
        this.setState({
          tradeProductsList:res.data
        })
      }else{{

      }}
    })
  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.refreshCart(this.props.token)
      this.fetchList();
      this.Fetch_Categories(this.props.token)
    } else {
      this.fetchList()
      this.getProducts()
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.refreshCart(newProps.token)
        this.fetchList();
        this.Fetch_Categories(newProps.token)
      }
    } else {
      this.fetchList()
    }
  }


  handleAddToCart = slug => {
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
      axios.post(addToCartURL, { slug })
      .then(res => {
        openNotification('Added to cart')
        this.props.refreshCart(this.props.token);
        this.setState({ loading: false });

      })
      .catch(err => {
        if (err.response.staus == 404){
          console.log(err.response)
        }
        this.setState({ error: err, loading: false });
      });
  };

 Process_Filter = (values, err) => {        
        const Title =
          values["Title"] === undefined ? null : values["Title"];
        const Category =
          values["Category"] === undefined ? null : values["Category"];
        const Price =
          values['Price'] === undefined ? null : values["Price"];
        const Location =
          values['Location'] === undefined ? null : values["Location"];

        if (!err) {
         const filter_url = 'https://trade-backkn.herokuapp.com/api/product_filter/'
          axios.get(filter_url, {
            params: {
            Title, Category, Price, Location
            }
          }).then(res => {
              this.setState({
                results_loading: true,
                search_results: res.data
              });
              console.log('this is are the results' , this.state.search_results)
            })
            .catch(err => {
              this.setState({ error: "There was an error" });
              console.log(err);
            });

        }

    };

 

  render() {

    let { data, error, loading, size, mm ,results_loading , search_results} = this.state;
    results_loading = true
    console.log(data);
    
    return (
        <>
          <Nav />
            <div className="container mx-auto my-16">
            <div class=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-12 items-stretch">

              <div className="sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-3 sm:ml-3 md:mx-auto">

              <Form className="" onFinish={this.Process_Filter}  >
                <Form.Item name="Title" >
                  <Input placeholder="Product Name"/>
                </Form.Item>

                <Form.Item name="Price" >
                  <Input placeholder="Price"/>
                </Form.Item>

                <Form.Item name="Location" >
                  <Input placeholder="Location"/>
                </Form.Item>

                <Form.Item name="Quantity" >
                  <Input placeholder="Quantity"/>
                </Form.Item>
                <Form.Item name ="Category">
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

              <div className="col-span-9">
                <div className="grid grid-cols-6 gap-4">

                        {
                          results_loading ? (
                            <>
                        {data.map((i) => (
                          <React.Fragment>
                          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-2">
                            
                            <CardList
                            pic={i.image}
                            price={i.price}
                            name={i.title}
                            category={i.category}
                            oncl={() => this.handleAddToCart(i.slug)}
                            />

                          </div>
                          </React.Fragment>
                        ) )} 
                        </>
                          ) : (
                            <div>
                        {search_results.map((i) => (
                          <React.Fragment>
                          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-2">
                            <CardList
                            pic={i.image}
                            price={i.price}
                            name={i.title}
                            category={i.category}
                            />
                          </div>
                          </React.Fragment>
                        ) )} 
                        </div>
                          )
                        }

                </div>
              </div>

            </div>
        </div>


        </>
    );
  }
}


const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: (token) => dispatch(fetchCart(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
