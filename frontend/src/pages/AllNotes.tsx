// src/components/NoteList.js
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {NoteType} from "../../../backend/src/models/note"
import * as apiClient from "../api-client";


const AllNotes = () => {
    const navigate = useNavigate();
    const [notesArr, setNotesArr] = useState<NoteType[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await apiClient.allNotes();
                setNotesArr(response); // Update the state with the fetched notes
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };

        fetchNotes(); // Call the async function
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const handleNoteClick = (note: NoteType) => {
        navigate(`/${note._id}`) //display one note//fix path
    };

    const createNewNote = () => {
        navigate('/createNote');
    };

    console.log("notesArr", notesArr)
    return (
        <div>
            <ul>
                {notesArr?.length > 0 ? (
                    notesArr.map(note => (
                        <li key={note._id}>
                            <button onClick={() => handleNoteClick(note)}>
                                {note.title}
                            </button>
                        </li>
                    ))
                ) : (
                    <li>
                        <button
                            onClick={createNewNote}
                            className="bg-transparent text-white px-4 py-2 rounded transition hover:bg-slate-200 hover:text-stone-500"
                        >
                            Create a new note
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );

};

export default AllNotes;
