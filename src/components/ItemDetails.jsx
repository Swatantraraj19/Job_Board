
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
             .then(res => setItem(res.data))
             .catch(err => console.error(err));
    }, [id]);

    if (!item) return <div className="p-10 text-center">Loading Details...</div>

    return (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl w-full mx-auto mt-10">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-4 text-indigo-600 hover:underline"
            >
                ← Go Back
            </button>
            
            <h1 className="text-3xl font-bold text-zinc-800 mb-2">{item.title}</h1>
            <div className="text-zinc-500 text-sm mb-6">
                By {item.by} • {new Date(item.time * 1000).toLocaleString()}
            </div>

            {/* If there is HTML text (like in 'Ask HN'), display it safely */}
            {item.text && (
                <div 
                    className="prose prose-indigo max-w-none bg-zinc-50 p-4 rounded-lg border mb-6"
                    dangerouslySetInnerHTML={{ __html: item.text }} 
                />
            )}

            {/* Placeholder for Comments */}
            <h3 className="text-xl font-bold border-b pb-2">Comments ({item.descendants || 0})</h3>
            <div className="mt-4 text-zinc-400 italic">
                (We will fetch comments later...)
            </div>
        </div>
    );
};

export default ItemDetails;