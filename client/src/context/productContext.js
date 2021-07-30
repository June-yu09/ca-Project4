import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import serverURL from '../../config';

export let ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
}

const ProductProvider = ({ children }) => {
    const [ products, setProducts ] = useState();
    const [ userProduct, setUserProduct ] = useState();
    const [ updated, setUpdated ] = useState(false);

    useEffect(()=>{
        axios.get(`${serverURL}/products/all`)
            .then(response=>{
                setProducts(response.data);
                console.log("get all products response.data?",response.data)
            })
            .catch(err=>console.log(err))
    },[updated]);

    useEffect(()=>{
        let token = "bearer " + localStorage.getItem('token');
        axios.post(`${serverURL}/products/usersall`,
            { myToken : localStorage.getItem('token')},
            { headers: { "Authorization" : token }}
            )
            .then(response=>{
                setUserProduct(response.data);
            })
            .catch(err=>console.log(err))
    },[updated]);

    const updateProducts = () => {
        setUpdated(!updated);
    }

    const productDetail = async (productId) => {
        let response = await axios.get(`${serverURL}/products/detail/${productId}`)
        return response.data
    }

    const deleteProduct = (productId, userId) => {
        axios.post(`${serverURL}/products/delete`, { productId: productId, userId: userId })
        .then(response=>console.log(response))
        .catch(err=>console.log(err))
    }
    

    return (
        <div>
            <ProductContext.Provider value={{ products, userProduct, updateProducts, productDetail, deleteProduct }}>
                { children }
            </ProductContext.Provider>
            
        </div>
    )

}

export default ProductProvider;