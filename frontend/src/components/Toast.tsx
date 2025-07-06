import { useEffect } from "react"

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
}

const Toast = ({message, type, onClose}: ToastProps) => {

    useEffect(() => {
        const timer = setTimeout(()=> {
            onClose();
        }, 5000);
        return () => {
            clearTimeout(timer);
        }
    }, [onClose])
    const styles = type === "SUCCESS"
        ? "fixed bottom-20 left-4 z-50 p-4 rounded-md bg-green-900 opacity-70 text-white max-w-md"
        :"fixed bottom-20 left-4 z-50 p-4 rounded-md bg-red-900 opacity-70 text-white max-w-md"


    return (
        //conditional styles
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    )
}

export default Toast;