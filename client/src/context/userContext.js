import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const userContext = React.createContext();


export function useUsers(){
    const context = useContext(userContext)
    if(context){
        return context;
    }
    
}

export function UserProvider ({ children }) {
    let [users, setUsers] = useState([]);
    const fetchUser = async () => {
        let response = await axios.get('http://localhost:5000/users/all');
        setUsers(response.data);
      }
    useEffect(()=>{
        fetchUser();
    },[])
    if(users){
        return (
            <>
                <userContext.Provider value={{users}}>
                { children }
                </userContext.Provider>
            </>
        )
    }
    
}

