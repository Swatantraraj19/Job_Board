import React, { useState } from 'react'
import useHackerNews from '../hooks/useHackerNews';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Search } from 'lucide-react';



const JobLists = () => {

    const { category, setCategory } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const { posts: jobs, loading, error, currentPage, totalPages, nextPage, prevPage } = useHackerNews(category);
    const { savedJobs, toggleSaveJob } = useAuth();

    // Helper to make the API category names user-friendly
    const formatTitle = (s) => {
        if (s === 'jobstories') return 'Latest Jobs';
        if (s === 'topstories') return 'Top News';
        if (s === 'newstories') return 'Newest Stories';
        return 'Stories';
    }

    // -- Search Filter Logic --
    // We filter the jobs list based on Title OR Author, case-insensitive.
    // If searchTerm is empty, .includes('') is true for everything, showing all jobs.
    const filteredJobs = jobs.filter(job =>
        (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.by && job.by.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className=' bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-start p-4 gap-6 transition-colors duration-200' >

            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                </div>

                <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex gap-2 transition-colors duration-200">
                    <button
                        onClick={() => { setCategory('jobstories') }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'jobstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                    >
                        Jobs
                    </button>
                    <button
                        onClick={() => { setCategory('topstories') }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'topstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                    >
                        Top Stories
                    </button>
                    <button
                        onClick={() => { setCategory('newstories') }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'newstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                    >
                        New Stories
                    </button>
                </div>
            </div>

            {loading ? (
                <div className='bg-zinc-50 dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 w-full max-w-4xl'>
                    <div className='flex flex-col gap-4'>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-60/50 dark:bg-zinc-900/50 animate-pulse">
                                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-4"></div>
                                <div className="flex gap-3">
                                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div>
                                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div className="text-center p-10 text-red-500 font-medium">{error}</div>
            ) : (
                <div className='bg-zinc-50 dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 w-full max-w-4xl transition-colors duration-200'>
                    <h2 className='text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100 border-b dark:border-zinc-800 pb-4'>{formatTitle(category)}</h2>
                    <div className='flex flex-col gap-4'>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => {
                                const isSaved = savedJobs.includes(job.id);
                                return (
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
                                                className={`p-2 rounded-full transition-all duration-200 ${isSaved ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-zinc-300 dark:text-zinc-600 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}
                                            >
                                                <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
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
                                                <Link
                                                    to={`/item/${job.id}`}
                                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold text-sm flex items-center gap-1"
                                                >
                                                    View Details <span className="transition-transform group-hover:translate-x-1">→</span>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center p-16 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
                                <Search className="w-12 h-12 mb-4 text-zinc-300 dark:text-zinc-600" />
                                <p className="text-lg font-medium">No matches found</p>
                                <p className="text-sm opacity-70">Try adjusting your search terms</p>
                            </div>
                        )}
                    </div>
                    <div className='flex gap-5 justify-center mt-8 text-center items-center'>
                        <button
                            onClick={prevPage}
                            disabled={loading || currentPage === 1}
                            className={`px-5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm ${loading || currentPage === 1 ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:shadow-md'}`}
                        >
                            Previous
                        </button>

                        <span className="text-zinc-500 dark:text-zinc-400 font-medium px-4">
                            Page <span className="text-indigo-600 dark:text-indigo-400 font-bold">{currentPage}</span> of {totalPages}
                        </span>

                        <button
                            onClick={nextPage}
                            disabled={loading || currentPage === totalPages}
                            className={`px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200 dark:shadow-indigo-900/20 ${loading || currentPage === totalPages ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:shadow-lg hover:-translate-y-0.5'}`}
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobLists