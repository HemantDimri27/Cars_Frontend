import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [loginUser, setLoginUser] = useState(false);
    const [carsData, setCarsData] = useState(null);

    return (
        <GlobalContext.Provider value={{loginUser, setLoginUser, carsData, setCarsData}}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;