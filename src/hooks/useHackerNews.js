 
///////////////  using one useeffect //////////////////////////

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // We accept 'type' so we can fetch 'jobstories', 'topstories', or 'newstories' later!
// const useHackerNews = (type) => {
//     const [posts, setPosts] = useState([]); // Renamed 'jobs' to 'posts' to be generic
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [count,setcount]= useState(9)

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 // 1. Fetch IDs based on the 'type' passed in
//                 const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
//                 const itemIds = response.data.slice(0, count);

//                 // 2. Fetch details
//                 const items = await Promise.all(
//                     itemIds.map(id => 
//                         axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
//                              .then(res => res.data)
//                     )
//                 );

//                 setPosts(items);
//                 setLoading(false);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch data");
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [count,type]); 
    
//     const loadMore = () => {
//         setcount((prevcount)=>prevcount+9);
//     };
//     const previousJobs = () => {
//         if(count>9)
//         setcount((prevcount)=>prevcount-9);
//     };
//     // Dependency array includes 'type' so if it changes, we re-fetch!

//     return { posts, loading, error,loadMore,previousJobs };
// };

// export default useHackerNews;


///////////////////// using 2 useeffect for performance optimization //////////////////////////


import { useState, useEffect, use } from 'react';
import axios from 'axios';


const useHackerNews = (type) => {

    const [posts, setposts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [allIds, setallIds] = useState([])
    const [visiblecount, setvisiblecount] = useState(9)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
               
                const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
                setallIds(response.data);

               
            } catch (err) {
                console.error(err);
                setError("Failed to fetch Ids");
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    useEffect( ()=>{

         if(allIds.length===0) return;  

         const fetchPosts = async () => {
            try {
                const nextBatch=allIds.slice(0,visiblecount);
                const items =await Promise.all(
                    nextBatch.map(id=>axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                      .then(res=>res.data)
                ));
                
                setposts(items);
                setLoading(false);
} catch (error) {
    console.error(error);
    setError("Failed to fetch posts");
    setLoading(false);
}

} ;

fetchPosts();
    },[allIds,visiblecount]);


    const loadMore = () => {
        setvisiblecount((prev)=>prev+9);
    }

    const previousJobs =()=>{
        if(visiblecount>9){
            setvisiblecount((prev)=>prev-9);
        }
    }

    return { posts, loading, error,loadMore,previousJobs };

}
export default useHackerNews;
