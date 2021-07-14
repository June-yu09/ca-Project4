import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

export let ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
}

const ProductProvider = ({ children }) => {
    const [ products, setProducts ] = useState();
    const [ userProduct, setUserProduct ] = useState();
    const [ updated, setUpdated ] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:5000/products/all')
            .then(response=>{
                setProducts(response.data);
                console.log("get all products response.data?",response.data)
            })
            .catch(err=>console.log(err))
    },[updated]);

    useEffect(()=>{
        let token = "bearer " + localStorage.getItem('token');
        axios.get('http://localhost:5000/products/usersall',
            { headers: { "Authorization" : token } }
            )
            .then(response=>{
                setUserProduct(response.data);
            })
            .catch(err=>console.log(err))
    },[updated]);

    const updateProducts = () => {
        setUpdated(!updated);
    }
    

    return (
        <div>
            <ProductContext.Provider value={{ products, userProduct, updateProducts }}>
                { children }
            </ProductContext.Provider>
            
        </div>
    )

}

export default ProductProvider;