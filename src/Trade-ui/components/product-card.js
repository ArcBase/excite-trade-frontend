import React from 'react'

export default function ProductCard() {
    return (
        <div>
            <ul className="product-card-grid">

                <li className="product-card-list">
                <div className="product-card-img-content">
                    <img
                        className="page-img"
                        src="https://images.unsplash.com/photo-1566037930079-5557545b02a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                        </div>
                        <h3 >Solid Mineral Resources Supply</h3>
                        <p>
                        We execute the supply of a broad range of solid mineral resources to various ports in over 54+ countries around the world.
                        </p>
                        <button className="button-cool">
                        Learn more
                        </button>
                    </li>

                    <li className="product-card-list">
                    <div className="product-card-img-content">
                        <img
                        className="page-img"
                        src="https://images.unsplash.com/photo-1586974710160-55f48f417990?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                        </div>
                        <h3 >Petroleum Products Supply</h3>
                        <p>
                        We execute the supply of a broad range of petroleum products to various ports in over 54+ countries around the world.</p>  
                        <button className="button-cool">
                        Learn more
                        </button>        
                    </li>

                    <li className="product-card-list">
                    <div className="product-card-img-content">
                        <img
                        className="page-img"
                        src="https://images.unsplash.com/photo-1515526764876-0f3b298ee4ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                        </div>
                        <h3 >Petroleum Products Supply</h3>
                        <p>
                        We execute the supply of a broad range of petroleum products to various ports in over 54+ countries around the world.</p>  
                        <button className="button-cool">
                        Learn more
                        </button>        
                    </li>

                    <li className="product-card-list">
                    <div className="product-card-img-content">
                        {/* <img
                        className="page-img"
                        src="https://image.freepik.com/free-vector/office-workers-analyzing-researching-business-data_74855-4445.jpg"
                        /> */}
                        </div>
                        <h3 >Petroleum Products Supply</h3>
                        <p>
                        We execute the supply of a broad range of petroleum products to various ports in over 54+ countries around the world.</p>  
                        <button className="button-cool">
                        Learn more
                        </button>        
                    </li>

                    </ul>
        </div>
    )
}
