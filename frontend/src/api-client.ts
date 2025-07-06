import { RegisterFormData } from "./pages/Register"
import {SignInFormData} from "./pages/SignIn";
import {CreateNoteFormData} from "./pages/CreateNote";
import { UpdateNoteFormData } from "./pages/UpdateNote";
import { NoteType } from "../../backend/src/models/note";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; //when we bundle the frontend into the backend there might be no base url anymore
console.log("API_BASE_URL:", API_BASE_URL);

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include", //anytime we make  post request we want http cookies along with the request and we also want to set any cookies we get back from the browser
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
    });

    if (!response.ok) {
    throw new Error("Token invalid");
    }
    return response.json();
};

export const signOut = async ()=>{
    const response = await fetch (`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method:"POST"
    });

    if(!response.ok){
        throw new Error("Error during sign out")
    }
}

export const createNote = async (formData: CreateNoteFormData)=>{
    const response = await fetch (`${API_BASE_URL}/api/notes/addNote`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
    return responseBody;
}

export const allNotes = async () : Promise<NoteType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/notes/allNotes`, {
        method: 'GET',
        credentials: "include", //anytime we make  post request we want http cookies along wiht the request and we also want to set any cookies we get back from the browser
        headers: {
            "Content-Type":"application/json"
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.json);
    }
    console.log(responseBody)
    return responseBody.content;
}

export const oneNote = async (id: string) : Promise<NoteType> => {
    const response = await fetch(`${API_BASE_URL}/api/notes/noteDetails/${id}`, {
        method: 'GET',
        credentials: "include",
        headers: {
            "Content-Type":"application/json"
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.json);
    }
    console.log(responseBody)
    return responseBody.content;
}

export const updateNote = async (id: string, formData: UpdateNoteFormData) =>{
    const response = await fetch (`${API_BASE_URL}/api/notes/updateNote/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
    return responseBody;
}