import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import {useNavigate} from "react-router-dom"

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword:string;
}

const Register = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { showToast } = useAppContext(); //destruct the showToast property from the hook useAppContext

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>(); //watch let us getthe value of one form input from another, handlesubmit to submit the form later, destruct the error property form the formState
    //useMutation- a convenient way to trigger mutations (API calls) and handle their side effects, such as invalidating cached data or refetching queries.
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({message: "Registration Success!", type: "SUCCESS"})
            await queryClient.invalidateQueries("validateToken")
            navigate("/");
        },
        onError: (error:Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data); //useMutation to have something handle making request for use?
    });

    return (
        <form className=" flex flex-col gap-5 mx-5 sm:mx-auto md:mx-20">
            <h2 className="text-white text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-white text-sm font-bold flex-1">
                    First Name
                    <input className="text-stone-500 border rounded w-full py-1 px-2 font-normal" 
                    {...register ( //add all the function, properties of register to the block
                        "firstName", 
                        {required: "This field is required"}
                    )}  //the name of the form we want in register and the validation
                    ></input>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label className="text-white text-sm font-bold flex-1">
                    Last Name
                    <input className="text-stone-500 border rounded w-full py-1 px-2 font-normal" 
                    {...register ( //add all the function, properties of register to the block
                        "lastName", 
                        {required: "This field is required"}
                    )}  //the name of the form we want in register and the validation
                    ></input> 
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}               
                </label>
            </div>
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
                <input className="text-stone-500 border rounded w-full py-1 px-2 font-normal"
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
            <label className="text-white text-sm font-bold flex-1">
                    Confirm Password
                <input className="text-stone-500 border rounded w-full py-1 px-2 font-normal" 
                    type = "password"
                    {...register ( //add all the function, properties of register to the block
                        "confirmPassword",
                        { validate:(val)=> {
                            if (!val) {
                                return "This field is required"
                            } else if (watch("password") !== val) {
                                return "Your password do not match"
                            }
                        }
                    })}  //the name of the form we want in register and the validation
                ></input>   
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}             
            </label>
            <span>
                <button type="submit" className=" text-white p-2 font-bold hover:bg-slate-200 hover:bg-opacity-50 text-xl" onClick={onSubmit}>
                    Create Account
                </button>
            </span>
        </form>
    )
}

export default Register;