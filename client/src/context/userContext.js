import React, { useContext, useState } from 'react';
import axios from 'axios';

export let userContext = React.createContext();

export const useUser = ()=>{
    return useContext(userContext);
}


const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    if(localStorage.getItem('token')){
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
           
                <userContext.Provider value={ user }>
                    {children}
                </userContext.Provider>
            
            
        </div>
    )
}
export default UserProvider;