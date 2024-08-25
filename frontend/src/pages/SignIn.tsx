import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client"
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const { 
        register, 
        formState: {errors},
        handleSubmit 
    } = useForm<SignInFormData>();

    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate =  useNavigate()

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "sign in Successful", type: "SUCCESS" });
            await queryClient. invalidateQueries("validateToken")
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
        <form className="flex flex-col gap-5 mx-5 sm:mx-auto md:mx-20" onSubmit={onSubmit}>
            <h2 className="text-white text-3xl font-bold"> Sign In </h2>
            <label className="text-white text-sm font-bold flex-1">
                    Email
                <input className="text-stone-500 border rounded w-full py-1 px-2 font-normal" 
                    type="email" //form validation
                    {...register ( //add all the function, properties of register to the block
                        "email", 
                        {required: "This field is required"}
                    )}  //the name of the form we want in register and the validation
                ></input>  
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}              
            </label>

            <label className="text-white text-sm font-bold flex-1">
                    Password
                <input className=" text-stone-500 border rounded w-full py-1 px-2 font-normal"
                    type="password" 
                    {...register ( //add all the function, properties of register to the block
                        "password", 
                        {required: 
                            "This field is required",
                            minLength: {
                                value:6,
                                message: "Password must has at least 6 characters"
                            }
                        }
                    )}  //the name of the form we want in register and the validation
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}                
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm text-white">
                    Not registered? <Link to="/register" className="hover:underline">Create an account</Link>
                </span>
                <span>
                    <button type="submit" className=" text-white p-2 font-bold hover:bg-slate-200 hover:bg-opacity-50 text-xl" onClick={onSubmit}>
                        Log In
                    </button>
                </span>
            </span>
        </form>
    )
}

export default SignIn;