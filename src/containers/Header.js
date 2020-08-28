import React from 'react'


export default function Header() {
    return (
        <>
       
        <div class="grid grid-cols-4 gap-4 mt-12 mx-auto">
            <div class="col-span-2 align-content-center text-justify text-center p-10  ...">
                         <div>
                            <h2 className="text-2xl ">Welcome to Trade</h2>
                            <p className="text-left text-xl texter-col">
                                An Import/Export platform for local resources and services
                            </p>
                            <button 
                            className="bg-red-500 hover:bg-reed-700 text-white font-bold py-2 px-4 rounded">
                            Get Started</button>
                        </div>
            </div>
            <div class="col-span-2 align-content-center mx-auto p-10">
            <div className="">
                            <img className="img-header "
                            src="https://image.freepik.com/free-vector/street-wooden-counter-with-exotic-spices-friendly-seller_87689-1204.jpg" />
                         </div>
            </div>
        </div>


        </>

    )
}
