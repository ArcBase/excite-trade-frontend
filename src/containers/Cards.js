import React from "react";
import Filter from "./Filter";
import { connect } from "react-redux";
import { productListURL, addToCartURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import axios from "axios";
import { Card, Row, Col, Tabs, Button, Radio, Icon } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Meta } = Card;

class ProductListHome extends React.Component {
  state = {
    loading: false,
    error: null,
    data: [],
    mm: [],
    size: "large",
  };

  callback = (key) => {
    console.log(key);
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  fetchList = () => {
    this.setState({ loading: true });
    axios
      .get("https://trade-backn.herokuapp.com/marketplace/product-list/")
      .then((res) => {
        this.setState({ data: res.data.slice(0, 4), loading: false });
        console.log(productListURL);
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchList();
  }

  componentWillReceiveProps(newProps) {
    this.fetchList();
  }

  handleAddToCart = (slug) => {
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .post(addToCartURL, { slug })
      .then((res) => {
        this.props.refreshCart(this.props.token);
        this.setState({ loading: false });
      })
      .catch((err) => {
        if (err.response.staus == 404) {
          console.log(err.response);
        }
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    var filter = {
      show: {
        zIndex: 100,
      },
    };
    const { data, error, loading, size, mm } = this.state;
    console.log(data);
    console.log(mm);
    console.log(productListURL);

    return (
      <>
        <h1 className="text-center">
          Featured Products
          <hr />
        </h1>

        <Tabs defaultActiveKey="1" onChange={callback} style={filter}>
          <TabPane tab="Fruits" key="1">
            <div className="">
              <div class="grid grid-row-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 items-stretch">
                {data.map((item) => (
                  <React.Fragment>
                    <div className="cols-span-12">
                      <div class="p-2 mt-12 mb-12">
                        <div
                          class="min-w-0 sm:min-w-full md:min-w-0 lg:min-w-full xl:min-w-0 rounded overflow-hidden shadow-lg">
                          <img class="w-full img-h" src={item.Image} />
                          <div class="px-6 py-4">
                            <div class="font-bold text-xl ">{item.Title} </div>
                            <p>Price: $ {item.Price}</p>
                          </div>

                          <div className="px-6">
                          <p>By:{item.Owner} </p>
                          </div>

                          <div class="px-6 py-4">
                            <span class="inline-block bg-red-900  ptext-sm font-semibold mr-2">
                              <a href={`/p-detail/${item.id}`}>
                                <button className=" hover:bg-blue-700 text-white font-bold py-2 px-10">
                                  View
                                </button>
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Vegetables" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tubers" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
        <hr />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshCart: (token) => dispatch(fetchCart(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListHome);
