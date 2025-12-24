import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, ArrowLeft } from 'lucide-react';

const SavedJobs = () => {
    const { savedJobs, toggleSaveJob } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchSavedJobs = async () => {
            setLoading(true);
            if (savedJobs.length === 0) {
                setJobs([]);
                setLoading(false);
                return;
            }

            try {

                const promises = savedJobs.map(id =>
                    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.data)
                );
                const results = await Promise.all(promises);

                setJobs(results.filter(job => job));
            } catch (err) {
                console.error("Failed to fetch saved jobs", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedJobs();
    }, [savedJobs]);

    return (
        <div className='bg-zinc-50 dark:bg-zinc-950 min-h-screen flex flex-col items-center p-4 gap-6 transition-colors duration-200'>

            <div className="w-full max-w-4xl flex items-center justify-between mb-4">
                <button onClick={() => navigate('/joblists')} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">My Saved Jobs ({savedJobs.length})</h1>
                <div className="w-20"></div>
            </div>

            {loading ? (
                <div className="text-center p-10 text-zinc-500 dark:text-zinc-400 animate-pulse">Loading saved jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="text-center p-20 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 w-full max-w-4xl transition-colors">
                    <h3 className="text-xl font-medium text-zinc-800 dark:text-white mb-2">No Saved Jobs Yet</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6">Bookmark jobs from the dashboard to see them here.</p>
                    <button onClick={() => navigate('/joblists')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Browse Jobs
                    </button>
                </div>
            ) : (
                <div className='bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 w-full max-w-4xl flex flex-col gap-4 transition-colors'>
                    {jobs.map((job) => (
                        <div key={job.id} className='p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300 group bg-white dark:bg-zinc-900/40 relative transform hover:-translate-y-1'>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className='font-semibold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-8 leading-tight'>
                                    {job.url ? (
                                        <a href={job.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2">
                                            {job.title}
                                            <span className="text-zinc-400 dark:text-zinc-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                        </a>
                                    ) : (
                                        job.title
                                    )}
                                </h3>

                                <button
                                    onClick={() => toggleSaveJob(job.id)}
                                    className="p-2 rounded-full text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-red-50 dark:hover:bg-zinc-700 hover:text-red-500 transition-colors"
                                    title="Remove from Saved"
                                >
                                    <Bookmark size={20} fill="currentColor" />
                                </button>
                            </div>

                            <div className='flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400'>
                                <span className='bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full font-medium text-xs border border-zinc-200 dark:border-zinc-700'>
                                    By {job.by}
                                </span>
                                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                <span className='bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full font-medium text-xs border border-zinc-200 dark:border-zinc-700'>
                                    {new Date(job.time * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>

                                <span className="ml-auto">
                                    <Link to={`/item/${job.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold text-sm flex items-center gap-1">
                                        View Details <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
