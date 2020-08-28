import React from "react";
import Nav from '../navbar'
import Footer from './footer'

import { Link, withRouter } from 'react-router-dom';

export default function AgricPage() {
  return (
    <>
      <Nav/>
      <div className="m-container">
        <div class="product-boxes">
          <div class="product-box">
            <h3>Lead Ore</h3>
            <p>Lorem ipsum dolor sit amet,</p>
          </div>
          <div class="product-box">
            <h3>Copper</h3>

            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>

          </div>
          <div class="product-box">
            <h3>Maganese</h3>
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>
          <div class="product-box">
            <h3>Copper</h3>
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>
          <div class="product-box">
            <h3>Copper</h3>

            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>
          <div class="product-box">
            <h3>Copper</h3>
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>
          <div class="product-box">
            <h3>Copper</h3>
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>
          <div class="product-box">
            <h3>Copper</h3>
          

            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>

          </div>

          <div class="product-box">
            <h3>Copper</h3>
           
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>

          </div>

          <div class="product-box">
            <h3>Copper</h3>
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>
          <div class="product-box">
            <h3>Copper</h3>
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>

          <div class="product-box">
            <h3>Copper</h3>
            <Link to="/e-p-detail/1">
            <p>Lorem ipsum dolor sit amet,</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
}
