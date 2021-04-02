import { createContext } from "react";

export interface IUser {
    displayName: string | null | undefined,
    email: string | null | undefined,
    photoURL: string | null | undefined,
    accessToken: string | null | undefined,
    idToken: string | null | undefined,
    refreshToken: string | null | undefined,
    uui: string | null | undefined
}

export interface IUserProps {
    user: IUser | null,
    updateUser: (user: IUser) => void,
}

export const AuthContext = createContext<IUserProps>({
    user: null,
    updateUser: (user: IUser) => user
})

export const AuthContextConsumer = AuthContext.Consumer;
export const AuthContextProvider = AuthContext.Provider;

export default AuthContext;
