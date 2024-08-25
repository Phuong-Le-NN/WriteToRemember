import * as React from "react"
import { useContext, useState } from "react"
import Toast from "../components/Toast";
import {useQuery} from "react-query";
import * as apiClient from "../api-client"

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
}

const AppContext = React.createContext <AppContext | undefined> (undefined);

export const AppContextProvider = ({
    children,
} : {
    children: React.ReactNode;
}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    
    //this run when an action cause the app to rerender (we refresh the page/we change the route)
    //when we click logout, we stay on the same page => no rerender => this does not get to run
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry:false,
    })

    return (
        <AppContext.Provider 
            value={{
                showToast: (toastMessage) =>{
                    setToast(toastMessage)
                },
                isLoggedIn: !isError //if there is not erroe isloggedin will be true
            }}
        >
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={()=>{setToast(undefined)}}
                />
            )}
            {children }
        </AppContext.Provider>
    )
}

//a hook we define ourselves
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext
}

//set up context and allow component to use it and its properties through the hook