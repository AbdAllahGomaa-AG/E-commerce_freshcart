import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../BURL/BURL";


export let storeContext = createContext(0)

export default function Provider({ children }) {

    let [count, setCount] = useState(0)
    function addToCart(token, productId) {
        return axios.post(`${baseUrl}/cart`, { productId }, { headers: { token } }).then(data => data).catch(error => error)
    }

    //getUserCart
    function getUserCart(token) {
        return axios.get(`${baseUrl}/cart`, { headers: { token } }).then(data => data).catch(error => error)
    }
    //delete cart 
    function removeCart(token, productId) {
        return axios.delete(`${baseUrl}/cart/${productId}`, { headers: { token } }).then(data => data).catch(error => error)
    }

    function UpdateCart(token, productId, count) {
        return axios.put(`${baseUrl}/cart/${productId}`, { count }, { headers: { token } }).then(data => data).catch(error => error)
    }

    function updateGetUserCart() {
        let token = localStorage.getItem('token')

        axios.get(`${baseUrl}/cart`, { headers: { token } }).then(data => {
            setCount(data.data.numOfCartItems)
        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        updateGetUserCart()
    }, [])

    return <>
        <storeContext.Provider value={{ addToCart, getUserCart, removeCart, UpdateCart, count, updateGetUserCart }}>
            {children}
        </storeContext.Provider>
    </>
} 