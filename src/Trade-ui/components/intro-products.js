import React, { Component } from "react";
import axios from "axios";

export default class IntroProducts extends Component {
  state = {
    data: "",
  };

  getProducts = () => {
    axios.get("https://trade-backn.herokuapp.com/marketplace/product-list/").then((res) => {
      this.setState({
        data: res.data.slice(0,4),
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
             <h3>{r.Name}</h3>
             <p>
               {r.Description}
             </p>
            <a href={`/e-p-detail/${r.id}`}>
                <button className="button-cool">View</button>
            </a>
           </li>
        )) }

        </ul>
      </div>
    );
  }
}
