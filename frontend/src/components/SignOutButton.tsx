import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client"
import {useAppContext} from "../contexts/AppContext";

const signOutButton = () => {
    const queryClient = useQueryClient() //the hook that let us do actions at global level
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({ message: "Signed out!", type: "SUCCESS"})
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"})
        },
    })

    const handleClick = () => {
        mutation.mutate();
    }
    return (
        <button className="text-stone-500 text-xl hover:underline" onClick={handleClick}>
            Sign Out
        </button>
    )
}

export default signOutButton;