import { createContext, useState } from "react";

export const AuthenticationContext = createContext({auth: true, setAuth: (auth: boolean) => {}});

export const AuthenticationProvider = ( {children}: any ) => {
  const [auth, setAuth] = useState(false)
  return(
    <AuthenticationContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
