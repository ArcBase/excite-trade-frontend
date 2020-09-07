import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Nav from "../navbar";
import Footer from "./footer";

export default class ProductCategory extends Component {
  state = {
    data: "",
  };

  getProducts = () => {
    const category_id = this.props.match.params.categoryID;
    axios
      .get(`https://trade-backn.herokuapp.com/marketplace/products-category/${category_id}`)
      .then((res) =>
        this.setState({
          data: res.data,
        })
      );
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { data } = this.state;
    console.log(data);
    const a = new Set(data);
    const b = Array.from(a);
    return (
      <div>
        <Nav />

        <div className="m-container">
          <div class="product-boxes">
            {b.map((r) => (
              <div class="product-box">
                <Link to={`/e-p-detail/${r.id}`}>
                  <h3>{r.Name}</h3>
                </Link>
                <div>
                  <p> Origin: Nigeria Mineral Type:{r.Name}</p>
                  <p> Physical Specification: Based On Buyer's Specification</p>
                  <p>
                    {" "}
                    Quantity: Based On Buyer’s Specification Price: Negotiable
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
