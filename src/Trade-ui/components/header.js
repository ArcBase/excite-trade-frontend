import React from "react";

export default function Header() {
  return (
    <>
      <section>
        <div class="text-container">
          <h1>Welcome To Excite Trade</h1>
          {/* <p>Leaders in Trade, Supply Chain Management, Dynamic Market place</p> */}
          <button class="hire-btn">Register</button>
          <button class="hire-btn-2">View Products</button>
        </div>
      </section>
      <div className="intro-box">
        <div className="intro-box-1">
          <h2>About Excite Trade</h2>
          <p>
            African countries are blessed with a wide variety of
            arable land and vast deposits of solid minerals. However, Africa’s
            export industry still requires much in terms of structure and ease
            of service. In Nigeria for instance, agricultural goods and solid
            minerals are still low, relative to total exports. This is despite
            the fact that the country has over 34 natural resources cut across
            the thirty-six states of the federation and the Federal Capital
            Territory.
          </p>
        </div>
        <div className="intro-box-2">
          <button className="intro-button">Learn More</button>
        </div>
      </div>
    </>
  );
}
