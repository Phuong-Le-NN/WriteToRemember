import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import {useEffect, useState} from "react";
import {NoteType} from "../../../backend/src/models/note";
import { useParams } from "react-router-dom";


export type UpdateNoteFormData = {
    title: string;
    details: string;
};

const UpdateNote = () => {
    const { id } = useParams<{ id: string }>();

    const { 
        register, 
        formState: { errors },
        handleSubmit 
    } = useForm<UpdateNoteFormData>();

    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [note, setNote] = useState<NoteType>(); // State to hold the notes

    useEffect(() => {
        const fetch1Note = async () => {
            try {
                const response = await apiClient.oneNote(id || ""); // Fetch the note using its ID
                setNote(response); // Update the state with the fetched notes
            } catch (err) {
                console.error('Error fetching 1 note:', err);
            }
        };

        fetch1Note(); // Call the async function
    }, []); // Empty dependency array means this effect runs once when the component mounts


const mutation = useMutation(
    async ({ id, formData }: { id: string; formData: UpdateNoteFormData }) => {
        return apiClient.updateNote(id, formData);
    },
    {
        onSuccess: async () => {
        showToast({ message: "Note updated successfully", type: "SUCCESS" });
        await queryClient.invalidateQueries("notes");
        navigate("/allNotes");
        },
        onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
        },
    }
);

    const onSubmit = handleSubmit((data) => {
        mutation.mutate({ id: id ? id : "", formData: data });
    });

    return (
        <form className="flex flex-col gap-5 mx-5 sm:mx-auto md:mx-20 mt-16" onSubmit={onSubmit}>
            <h2 className="text-white text-3xl font-bold">Update a Note</h2>
            <label className="text-white text-sm font-bold flex-1">
            Title
            <input
                className="text-white bg-stone-500 border border-[silver] bg-opacity-35 backdrop-blur-sm rounded font-normal focus:outline-none focus:ring-0 w-full py-1 px-2"
                type="text"
                defaultValue={note?.title || ""} // Pre-fill the title if note is fetched
                {...register("title", {
                    validate: (value) => {
                        // Custom condition: title must not be only whitespace and must be at least 3 characters
                        if (!value || value.trim().length < 1) {
                            return "Title must be at least 1 non-whitespace character.";
                        }
                        return true;
                    },
                })}
            />
            {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
            )}
            </label>

            <label className="text-white text-sm font-bold flex-1">
            Details
            <textarea
                className="text-white bg-stone-500 border border-[silver] bg-opacity-35 backdrop-blur-sm rounded font-normal focus:outline-none focus:ring-0 w-full h-72 py-1 px-2"
                defaultValue={note?.details || ""} // Pre-fill the details if note is fetched
                {...register("details")}
            />
            {errors.details && (
                <span className="text-red-500">{errors.details.message}</span>
            )}
            </label>

            <button 
            type="submit" 
            className="text-white p-2 font-bold hover:bg-slate-200 hover:bg-opacity-50 text-xl"
            >
            Update Note
            </button>
        </form>
    );
};

export default UpdateNote;
