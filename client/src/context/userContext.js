import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

export let UserContext = React.createContext();
export let UserUpdateContext = React.createContext();

export const useUser = ()=>{
    return useContext(UserContext);
}
export const useUserUpdate = () =>{
    return useContext(UserUpdateContext);
}


const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            const token = "bearer " + localStorage.getItem('token');
            axios.get("http://localhost:5000/users/profile",
            { headers: { "Authorization" : token } }
            )
            .then(response => {
                setUser(response.data)
                
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[]);


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
                    {children}
                </UserUpdateContext.Provider>
                </UserContext.Provider>
            
            
        </div>
    )
}
export default UserProvider;