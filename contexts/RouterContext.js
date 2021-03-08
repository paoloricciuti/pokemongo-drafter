import React, { useState, createContext, useContext } from 'react';

const useRouterState = ()=>{
    return useContext(RouterContext)
};
const RouterContext = createContext(null);

const RouterContextProvider = ({ children }) => {
    const [routerState, setRouterState] = useState(null);
    return (
        <RouterContext.Provider value={[ routerState, setRouterState ]}>
            {children}
        </RouterContext.Provider>
    )
}

export default RouterContextProvider;
export { useRouterState };