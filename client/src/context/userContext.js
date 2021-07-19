import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

export let UserContext = React.createContext();
export let UserUpdateContext = React.createContext();
export let GetUserContext = React.createContext();

export const useUser = ()=>{
    return useContext(UserContext);
}
export const useUserUpdate = () =>{
    return useContext(UserUpdateContext);
}
export const useGetUser = () => {
    return useContext(GetUserContext);
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


    const userUpdate = t => {
        localStorage.setItem('token',t);
        const token = "bearer " + localStorage.getItem('token');
        console.log('User update func is called!!!');
        axios.get("http://localhost:5000/users/profile",
            { headers: { "Authorization" : token } }
            )
            .then(response => {
                setUser(response.data);
                console.log('user is set', response.data);
            })
    }

    const getUser = async (userId) => {
        const response = await axios.get(`http://localhost:5000/users/detail/${userId}`);
        console.log('from userContext', response.data);
        const detailUser = response.data;
        return detailUser;
    }

    const getTheUser = async () => {
        const token = "bearer " + localStorage.getItem('token');
        const response = await axios.get("http://localhost:5000/users/profile",
        { headers: { "Authorization" : token } }
        )
        return response.data;
        
    }
    
    

    return (
        <div>
           
                <UserContext.Provider value={ user }>
                <UserUpdateContext.Provider value={ userUpdate }>
                <GetUserContext.Provider value={{ getUser, getTheUser }}>
                    {children}
                </GetUserContext.Provider>
                </UserUpdateContext.Provider>
                </UserContext.Provider>
            
            
        </div>
    )
}
export default UserProvider;