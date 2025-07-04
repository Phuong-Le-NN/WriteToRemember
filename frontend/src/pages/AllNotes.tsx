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
                console.log(response)
                setNotesArr(response); // Update the state with the fetched notes
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };

        fetchNotes(); // Call the async function
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const handleNoteClick = (note: NoteType) => {
        navigate(`http://localhost:5173/api/editNotes/${note._id}`)
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
                    <li>No notes available</li>
                )}
            </ul>
        </div>
    );

};

export default AllNotes;
