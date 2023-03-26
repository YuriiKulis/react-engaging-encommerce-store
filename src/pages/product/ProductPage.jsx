import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";



export default function ProductPage(props) {
    let path = window.location.pathname.split('/')
    const id = parseInt(path[2]);
    const endpoint = "http://localhost:8080/api/products/" + id;
    const {addToCart, cartItems} = useContext(ShopContext)
    const [product, setProduct] = useState([])

    const cartItemAmount = cartItems.get(id);

    function getProducts (){
        axios.get(endpoint).then((response)=> {
            setProduct(response.data)
        })
    }

    useEffect(() => {
        getProducts();
    })

    return (
        <div className="min-h-screen">
                <img className=" h-80 w-72 object-cover mx-auto mt-5" alt={product.description} src={product.image}/>
                <h1 className="text-center py-2">{product.productName}</h1>
                <h3 className="text-center">Price: ${product.price}</h3>
                <h4 className="text-center py-2">Category: {product.category}</h4>
                <p  className="text-center">{product.description}</p>
                <div className=" flex justify-center py-4">
                    <button onClick={() => addToCart(id)} className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white border-2 border-gray-900 focus:outline-none">
                        Add To Cart{cartItemAmount > 0 && <>| {cartItemAmount} </>}
                    </button>
                </div>
        </div>
    )
}