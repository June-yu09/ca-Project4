import React, { useContext, useState } from 'react'

export let tokenContext = React.createContext();
export let tokenUpdateContext = React.createContext();

export const useToken = ()=>{
    return useContext(tokenContext);
}

export const useTokenUpdate = ()=>{
    return useContext(tokenUpdateContext);
}

function TokenProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const tokenUpdate = (a)=>{
        localStorage.setItem('token',a);
        setToken(localStorage.getItem('token'));
    }

    return (
        <div>
            <tokenContext.Provider value={ token }>
                <tokenUpdateContext.Provider value={ tokenUpdate }>
                    {children}
                </tokenUpdateContext.Provider>
            </tokenContext.Provider>
        </div>
    )
}
export default TokenProvider;