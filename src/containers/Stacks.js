import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot, faTruck, faCertificate, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'

export default function Stacks() {
    return (
        <>
             <div className="boxes">
                        <div className=' box'>
                        <FontAwesomeIcon icon={faTruck} size="4x" color="#d13100"/>
                        <h3>SMOOTH DELIVERY</h3>
                        <p>QUICK DELIVERY</p>
                        </div>
                        <div className=' box'>
                        <FontAwesomeIcon icon={faCarrot} size="4x" color="#d13100" />
                        <h3>ALWAYS FRESH</h3>
                        <p>PRODUCT WELL PACKAGE</p>
                        </div>

                        <div className=' box'>
                        <FontAwesomeIcon icon={faCertificate} size="4x" color="#d13100" />
                        <h3>SUPERIOR QUALITY</h3>
                        <p>QUALITY PRODUCTS</p>
                        </div>

                        <div className=' box'>
                        <FontAwesomeIcon icon={faPhoneVolume} size="4x" color="#d13100" />
                        <h3>SUPPORT</h3>
                        <p>24/7 SUUPORT</p>
                        </div>
            </div>

        </>
    )
}
