
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

    if (!item) return <div className="p-10 text-center text-zinc-600 dark:text-zinc-400">Loading Details...</div>

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 max-w-4xl w-full mx-auto mt-10 transition-colors duration-200">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
                ← Go Back
            </button>

            <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">{item.title}</h1>
            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                By <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.by}</span> • {new Date(item.time * 1000).toLocaleString()}
            </div>

            {item.text && (
                <div
                    className="prose prose-indigo dark:prose-invert max-w-none bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 mb-6 text-zinc-700 dark:text-zinc-300"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                />
            )}

            <h3 className="text-xl font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 text-zinc-800 dark:text-zinc-100">Comments ({item.descendants || 0})</h3>
            <div className="mt-4 text-zinc-400 dark:text-zinc-500 italic">
                (We will fetch comments later...)
            </div>
        </div>
    );
};

export default ItemDetails;