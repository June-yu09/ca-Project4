import React, { useContext, useState } from 'react'

export let TokenContext = React.createContext();
export let TokenUpdateContext = React.createContext();

export const useToken = ()=>{
    return useContext(TokenContext);
}

export const useTokenUpdate = ()=>{
    return useContext(TokenUpdateContext);
}

function TokenProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const tokenUpdate = (a)=>{
        localStorage.setItem('token',a);
        setToken(localStorage.getItem('token'));
    }

    return (
        <div>
            <TokenContext.Provider value={ token }>
                <TokenUpdateContext.Provider value={ tokenUpdate }>
                    {children}
                </TokenUpdateContext.Provider>
            </TokenContext.Provider>
        </div>
    )
}
export default TokenProvider;