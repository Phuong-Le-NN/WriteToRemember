// src/components/NoteList.js
import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {NoteType} from "../../../backend/src/models/note"

const AllNotes = () => {
    const navigate = useNavigate();
    let notesArr: NoteType[] = [];

    useEffect(() => {
        // Fetch all notes from the backend
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http:/localhost:7000/api/allNotes');
                notesArr = response.data;
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };

        fetchNotes();
    }, []);

    const handleNoteClick = (note: NoteType) => {
        navigate(`http://localhost:5173/api/editNotes/${note._id}`)
    };

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notesArr.map(note => (
                    <li key={note._id}>
                        <button onClick={() => handleNoteClick(note)}>
                            {note.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllNotes;
