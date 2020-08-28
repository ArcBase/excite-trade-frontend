import React from "react";

export default function Header() {
  return (
    <>
      <section>
        <div class="text-container">
            <h1>Welcome To Excite Trade</h1>
            {/* <p>Leaders in Trade, Supply Chain Management, Dynamic Market place</p> */}
          <button class="hire-btn">Register</button>
          <button class="hire-btn">View Products</button>
        </div>
      </section>
      <div className="intro-box">
        <div className="intro-box-1">
          <h2>About Excite Trade</h2>
          <p>Our global trade expertise enables us to execute the supply of food, agricultural products, solid minerals, and petroleum products at the best quality and price for every qualified buyer. We ensure the transaction procedures are safe for our clients and help guarantee safely secure long-term contracts at the required quantity and price.</p>
        </div>
        <div className="intro-box-2">
          <button className="intro-button">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
}
