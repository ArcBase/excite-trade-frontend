import React, { Component } from "react";
import Nav from "../navbar";
import Footer from "./footer";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

export default class AgricPage extends Component {
  state = {
    data: "",
  };

  getProducts = () => {
    axios.get("https://trade-backn.herokuapp.com/marketplace/product-list/").then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { data } = this.state;
    console.log(data);
    const a = new Set(data);
    const products = Array.from(a);

    return (
      <>
        <Nav />
        <div className="m-container">
          <div class="product-boxes">
            {products.map((r) => (
              <div class="product-box">
                <Link to={`/e-p-detail/${r.id}`}>
                 <h3>{r.Name}</h3>                 
                </Link>
                <div>
                  <p> Origin: Nigeria Mineral Type:{r.Name}</p>
                  <p> Physical Specification: Based On Buyer's Specification</p>                 
                  <p> Quantity: Based On Buyer’s Specification Price: Negotiable</p>

                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
