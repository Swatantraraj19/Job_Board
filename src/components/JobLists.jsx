import React from 'react'
import useHackerNews from '../hooks/useHackerNews';
import { Link } from 'react-router-dom';

const JobLists = ({ category }) => {

    const { posts: jobs, loading, error, loadMore, previousJobs } = useHackerNews(category);

    const formatTitle = (s) => {
        if (s === 'jobstories') return 'Latest Jobs';
        if (s === 'topstories') return 'Top News';
        if (s === 'newstories') return 'Newest Stories';
        return 'Stories';
    }

    if (loading) return <div className="text-center p-10 text-zinc-500 animate-pulse">Loading...</div>
    if (error) return <div className="text-center p-10 text-red-500 font-medium">{error}</div>

    return (
        <div className='bg-zinc-50 rounded-xl shadow-sm border border-zinc-200 p-6 w-full max-w-4xl'>
            <h2 className='text-2xl font-bold mb-6 text-zinc-800 border-b pb-4'>{formatTitle(category)}</h2>
            <div className='flex flex-col gap-4'>
                {jobs.map((job) => (
                    <div key={job.id} className='p-4 border border-zinc-200 rounded-lg hover:border-indigo-200 hover:shadow-md transition-all group bg-zinc-60/50 hover:bg-white'>
                        <h3 className='font-semibold text-lg text-zinc-900 group-hover:text-indigo-600 transition-colors'>
                            {job.url ? (
                                <a href={job.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    {job.title}
                                    <span className="text-xs text-zinc-400 font-normal">↗</span>
                                </a>
                            ) : (
                                job.title
                            )}
                        </h3>
                        <div className='flex flex-col md:flex-row items-center gap-3 mt-2 text-sm text-zinc-400'>
                            <span className='bg-zinc-200/50 px-2 py-0.5 rounded text-zinc-600'>By {job.by}</span>
                            <span>•</span>
                            <span>{new Date(job.time * 1000).toLocaleDateString()}</span>

                           
                            <span className="ml-auto">
                                <Link
                                    to={`/item/${job.id}`}
                                    className="text-indigo-600 hover:underline font-medium"
                                >
                                    View Details →
                                </Link>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex gap-5 justify-center mt-6 text-center'>
                <button
                    onClick={loadMore}
                    disabled={loading}
                    className={`px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Loading...' : 'Load More Jobs'}
                </button>

                <button
                    onClick={previousJobs}
                    disabled={loading}
                    className={`px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Loading...' : 'Previous Jobs'}
                </button>
            </div>
        </div>
    )
}

export default JobLists