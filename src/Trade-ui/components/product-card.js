import React, { Component } from "react";
import axios from "axios";

export default class ProductCard extends Component {
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
    const a = new Set(data)
    const products = Array.from(a)
    return (
      <div>
        <ul className="product-card-grid">

        {products.map((r)=>(
             <li key={r.id} className="product-card-list">
             <div className="product-card-img-content">
               <img
                 className="page-img"
                 src={r.Image} />
             </div>
             <h3>Gold</h3>
             <p>
               {r.Description}
             </p>
             <p>{r.Weight}</p>
            <a href="">
                <button className="button-cool">View</button>
            </a>
           </li>
        )) }

        </ul>
      </div>
    );
  }
}
