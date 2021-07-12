import React, { useContext, useState } from 'react';
import axios from 'axios';

export let UserContext = React.createContext();
export let UserUpdateContext = React.createContext();
export let UserProductsContext = React.createContext();

export const useUser = ()=>{
    return useContext(UserContext);
}
export const useUserUpdate = () =>{
    return useContext(UserUpdateContext);
}
export const useUserProducts = () => {
    return useContext(UserProductsContext);
}


const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userProducts, setUserProducts] = useState();

    if(localStorage.getItem('token')){
        const token = "bearer " + localStorage.getItem('token');
        axios.get("http://localhost:5000/users/profile",
        { headers: { "Authorization" : token } }
        )
        .then(response => {
            setUser(response.data)
        })
    }

    if (localStorage.getItem('token')) {
        const token = "bearer " + localStorage.getItem('token');
        axios.get("http://localhost:5000/products/usersall",
        { headers: { "Authorization" : token } }
        )
        .then(response => {
            console.log('response is', response);
            setUserProducts(response.data);
        })
    }

    const userUpdate = (t)=>{
        localStorage.setItem('token',t);
        const token = "bearer " + localStorage.getItem('token');
        axios.get("http://localhost:5000/users/profile",
        { headers: { "Authorization" : token } }
        )
        .then(response => {
            setUser(response.data)
        })
    }

    
    

    return (
        <div>
           
                <UserContext.Provider value={ user }>
                <UserUpdateContext.Provider value={ userUpdate }>
                <UserProductsContext.Provider value={ userProducts }>
                    {children}
                </UserProductsContext.Provider>
                </UserUpdateContext.Provider>
                </UserContext.Provider>
            
            
        </div>
    )
}
export default UserProvider;