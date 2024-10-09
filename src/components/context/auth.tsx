'use client'
import React from "react";

interface AuthContextType {
    bearerToken: string | null | undefined;
}

const initialState = {
    bearerToken: undefined,
};

const AuthContext = React.createContext<AuthContextType>(initialState);
export function useAuthToken() {
    return React.useContext(AuthContext);
}

export function AuthTokenProvider(props: any) {
    return (
        <AuthContext.Provider value={{
            bearerToken: props.bearerToken,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
