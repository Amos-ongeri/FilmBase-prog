import { useEffect,useState } from "react";
import axios from "axios";
import MovieCard from "../components/Cards/MovieCard";
import MovieCard1 from "../components/Cards/MovieCard1";
import { MdSearch, MdSort } from "react-icons/md";
import user_avatar from '../assets/user-avatar.png'
import { CiFilter } from "react-icons/ci";

const dataMap = new Map();
const searchResultsMap = new Map()
const Discover =()=>{
    const [discover, setDiscover] = useState()
    const [keywords,setKeywords] = useState()
    const [query,setQuery] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchData,setSearchData] = useState()

    useEffect(()=>{
        const getDiscover = async ()=>{
            const types = {
                t1: 'movie',
                t2: 'tv'
            }
            try{
                if(dataMap.has('discover')){
                    setDiscover(dataMap.get('discover'))
                }else{
                    const [movie, tv] = await Promise.all([
                        axios.get(`http://localhost:5000/api/discover/${types.t1}`),
                        axios.get(`http://localhost:5000/api/discover/${types.t2}`)
                    ])
                    console.log('movie:', movie);
                    const movies = movie?.data?.results.map(m=>({
                        ...m,
                        media_type: 'movie'
                    }))
                    const Tv = tv?.data?.results.map(t=>({
                        ...t,
                        media_type: 'tv'
                    }))
                    
                dataMap.set('discover', [...movies,...Tv])
                setDiscover([...movies,...Tv])
                }
            }catch(e){
                console.log('error occurred: ', e.message);
            }
        }
        getDiscover()
    },[])
    useEffect(()=>{
        if(!query || keywords.length === 0) setKeywords('');
        const getKeywords = async (query)=>{
            try{
                const { data } = await axios.get(`http://localhost:5000/api/keywords/search?query=${query}`)                
                setKeywords(data?.results)
            }catch(e){
                console.log('error occurred: ',e.message);
                
            }

        }
        //debouncing - delay until typing stops
        const timeout = setTimeout(()=>{
            getKeywords(query)
        },500)
        return ()=> clearTimeout(timeout)
    },[keywords?.length, query])

    useEffect(()=>{
        if(!searchQuery) return;
        const getSearchData = async (queryParam)=>{
            if(searchResultsMap.has(queryParam)){
                setSearchData(searchResultsMap.get(queryParam))
            }else{
            try{
                const { data } = await axios.get(`http://localhost:5000/api/query/search/multi?query=${queryParam}`)
                searchResultsMap.set('search', data.results)
                setSearchData(data.results)
            }catch(e){
                console.log('error occurred: ', e.message);
            }
            }
        }
        getSearchData(searchQuery)
    },[searchQuery])

    let tv_movie_filter,person_filter;
    if(searchData){
        tv_movie_filter = searchData.filter(s=> (s.media_type === 'tv' || s.media_type === 'movie') && s.poster_path !== null)
        person_filter = searchData.filter(p=> p.media_type === 'person')
    }

    useEffect(()=>{
        console.log('discover', discover);        
    },[discover])
    useEffect(()=>{
        console.log('keywords,',keywords);
    },[keywords, query])
    useEffect(()=>{
        console.log('search data,',tv_movie_filter);
    },[searchData, tv_movie_filter])
    return(
        <div className="relative w-[95%] min-h-full text-gray-300 pt-1">
            {keywords && keywords?.length > 0 && query !== '' && (
                <div className="absolute left-6 top-12 rounded-lg bg-gray-200 transition-all duration-300 z-20 w-110 min-h-20 max-h-110 overflow-auto p-3 space-y-1 no-scrollbar">
                {
                    keywords.map((k,i)=>(
                        <div onClick={()=> {
                            setSearchQuery(k.name)
                            setQuery('')
                        }} key={i} className="h-fit hover:bg-gray-400 hover:text-white rounded-md p-1 flex items-center space-x-2 text-black cursor-pointer">
                            <MdSearch size={20}/>
                            <p>{k.name}</p>
                        </div>
                    ))
                }
            </div>
            )}
            <div className="w-110 relative h-10 mx-6">
                <input onChange={(e)=> setQuery(e.target.value)} type="text" autoComplete="off" name="text" placeholder="search film..." className="w-full h-full outline-none bg-gray-200 rounded-lg text-black p-2" />
                <button onClick={()=>{
                    setSearchQuery(query)
                    setQuery('')
                    }} title="search" className="absolute right-1 bottom-1 bg-gray-800/50 h-[80%] w-8 flex items-center justify-center rounded-lg cursor-pointer">
                    <MdSearch size={20}/>
                </button>
            </div>
            <br />
            {!searchData ? (
                <div className="min-h-70 w-full">
                <div className="sticky top-15 z-10 p-1 rounded-sm bg-gray-900 self-start flex justify-between w-full px-8">
                    <p>Discover</p>
                    <div className="min-w-25 flex space-x-2 justify-between">
                        <button className="flex items-center cursor-pointer"><MdSort size={20}/>Sort</button>
                        <button className="flex items-center cursor-pointer"><CiFilter size={20}/>Filter</button>
                    </div>
                </div>
                <br />
                <div className="grid grid-cols-5 gap-4 w-full px-6">
                {discover &&(
                    discover?.map((t,i)=>(
                        <MovieCard1 Key={i} data={t}/>
                    ))
                )}
                </div>
            </div>
            ) : (
                <div className="px-6">
                    <p>results for : "{searchQuery}"</p>
                    <br />
                    {person_filter.length > 0 && (
                        <div className="">
                        <p>people</p>
                        <br />
                        <div className="flex space-x-2 overflow-auto">
                            {person_filter?.map((p,i)=>(
                                <div className="w-30 h-fit cursor-pointer shrink-0">
                                    <img key={i} src={person_filter.profile_path ? `https://image.tmdb.org/t/p/w500${p.profile_path}` : user_avatar} alt="" className="w-20  rounded-full"/>
                                    <p>{p.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}
                    <br />
                    <hr className="border-0.5 border-gray-800 mx-4"/>
                    <br />
                    <div className="grid grid-cols-5 gap-4">
                        {tv_movie_filter?.map((s,i)=>(
                            <MovieCard1 Key={i} data={s}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Discover;