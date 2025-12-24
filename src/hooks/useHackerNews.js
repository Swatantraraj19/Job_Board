import { useState, useEffect } from 'react';
import axios from 'axios';

const useHackerNews = (type) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allIds, setAllIds] = useState([]);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // 1. Fetch ALL IDs once when 'type' changes
    useEffect(() => {
        const fetchIds = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
                setAllIds(response.data || []);
                setCurrentPage(1); // Reset to page 1 when category changes
            } catch (err) {
                console.error(err);
                setError("Failed to fetch IDs");
                setLoading(false);
            }
        };

        fetchIds();
    }, [type]);

    // 2. Fetch specific POSTS whenever 'currentPage' or 'allIds' changes
    useEffect(() => {
        if (allIds.length === 0) return;


        const fetchPosts = async () => {
            setLoading(true);
            try {

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentBatchIds = allIds.slice(startIndex, endIndex);

                const items = await Promise.all(
                    currentBatchIds.map(id =>
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.data)
                    )
                );

                setPosts(items);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch posts");
                setLoading(false);
            }
        };

        fetchPosts();

    }, [allIds, currentPage]);


    const nextPage = () => {
        if (currentPage < Math.ceil(allIds.length / itemsPerPage)) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return {
        posts,
        loading,
        error,
        currentPage,
        totalPages: Math.ceil(allIds.length / itemsPerPage),
        nextPage,
        prevPage
    };
}

export default useHackerNews;
