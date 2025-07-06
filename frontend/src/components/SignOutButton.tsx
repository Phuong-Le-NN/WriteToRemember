import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client"
import {useAppContext} from "../contexts/AppContext";

interface SignOutButtonProps {
    className?: string;
}

const signOutButton: React.FC<SignOutButtonProps> = ({ className }) => {
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
        <button onClick={handleClick} className={className}>
            Sign Out
        </button>
    )
}

export default signOutButton;