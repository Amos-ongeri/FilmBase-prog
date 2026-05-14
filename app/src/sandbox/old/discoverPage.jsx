import { useEffect,useState } from "react";
import MovieCard from "../../components/cards/MovieCard";
import MovieCard1 from "../../components/cards/MovieCard1";
import { MdArrowDownward, MdArrowUpward, MdSearch, MdSort } from "react-icons/md";
import user_avatar from '../assets/user-avatar.png'
import { CiFilter } from "react-icons/ci";
import { useRef } from "react";
import CardSkeleton from "@/components/placeholders/cardSkeleton";
import { getKeywords } from "@/services/api";

const dataMap = new Map();
const searchResultsMap = new Map()
const Discover =()=>{
    const [discover, setDiscover] = useState()
    const [keywords,setKeywords] = useState()
    const [query,setQuery] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchData,setSearchData] = useState()
    const [sortItem, setSortItem] = useState()

    useEffect(()=>{
        const getDiscover = async ()=>{
            const types = {
                t1: 'movie',
                t2: 'tv'
            }
            try{
                if(dataMap.has('movie') && dataMap.has('tv')){
                    setDiscover(dataMap.get('movie'))
                    setDiscover(dataMap.get('tv'))
                }else{
                    const [movie, tv] = await Promise.all([
                        fetch(`http://localhost:5000/api/discover/${types.t1}`),
                        fetch(`http://localhost:5000/api/discover/${types.t2}`)
                    ])

                    const movies = await movie.json()
                    console.log('movie:', movies);

                    const movieWithType = movies?.results?.map(m=>({
                        ...m,
                        media_type: 'movie'
                    }))
                    const Tv = await tv.json()
                    const tvWithType = Tv?.results?.map(t=>({
                        ...t,
                        media_type: 'tv'
                    }))

                dataMap.set('movie', movies.results)
                dataMap.set('tv', Tv.results)
                setDiscover({'movies': movieWithType, 'tv': tvWithType})
                }
            }catch(e){
                console.log('error occurred: ', e.message);
            }
        }
        getDiscover()
    },[])
    useEffect(()=>{
        const not  = ()=>{
            if(!query || keywords?.length === 0) setKeywords('');
        }
        const initKeywords = async (query)=>{
            const thisKeywords = await getKeywords(query);
            setKeywords(thisKeywords)
        }
        not()
        //debouncing - delay until typing stops
        const timeout = setTimeout(()=>{
            initKeywords(query)
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
                const res = await fetch(`http://localhost:5000/api/query/search/multi?query=${queryParam}`)
                const data = await res.json();
                console.log(data);
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

    const sort = [
        {name: 'popularity', value: 'popularity.asc', icon: <MdArrowUpward/>},
        {name: 'popularity', value: 'popularity.desc', icon: <MdArrowDownward/>},
        {name: 'title', value: 'title.asc', icon: <MdArrowUpward/>},
        {name: 'title', value: 'title.desc', icon: <MdArrowDownward/>},
        {name: 'release', value: 'primary-release-date.asc', icon: <MdArrowUpward/>},
        {name: 'release', value: 'primary-release-date.desc', icon: <MdArrowDownward/>}
    ]
    const sortList = useRef();
    const handleSortList = ()=>{
        if(sortList.current){
            sortList.current.classList.toggle('hidden')
        }
    }
    console.log(sortItem);

    const hasDiscovery = [discover?.movies, discover?.tv].every(item => item?.length !== 0 & item !==undefined)
    
    return(
        <div className="relative w-full min-h-50 text-gray-300 pt-1">
            {hasDiscovery && (
                <>
                    <div className="lg:w-110 relative h-10 mx-6 mt-3">
                        <input onChange={(e)=> setQuery(e.target.value)} type="text" autoComplete="off" name="text" placeholder="search film..." className="w-full h-full outline-none bg-gray-200 rounded-lg text-black p-2" />
                        <button onClick={()=>{
                        setSearchQuery(query)
                        setQuery('')
                        }} title="search" className="absolute right-1 bottom-1 bg-slate-700 h-[80%] w-10 flex items-center justify-center rounded-lg cursor-pointer">
                            <MdSearch size={20}/>
                        </button>
                        {keywords && keywords?.length > 0 && query !== '' && (
                            <div className="absolute left-0 top-12 rounded-lg bg-gray-200 transition-all duration-300 z-20 w-110 min-h-20 max-h-110 overflow-auto p-3 space-y-1 no-scrollbar">
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
                    </div>
                    <br />
                </>
            )}
            {!searchData ? (
                (hasDiscovery ? (
                    <div className="min-h-70 w-full">
                        <div className="sticky top-[6%] z-10 p-1 bg-gray-900 self-start flex justify-between items-center w-full min-h-10 px-6">
                            <p>Discover</p>
                            <div className="min-w-25 flex space-x-2 justify-between relative">
                                <div ref={sortList} className="absolute top-10 -left-10 min-h-20 min-w-20 bg-gray-200 text-black rounded-md p-1 hidden">
                                    {sort?.map(s=> <p onClick={()=> setSortItem(s?.value)} className="hover:bg-gray-400 hover:text-white cursor-pointer p-2 rounded-sm flex items-center justify-between w-full">{s?.name}{s?.icon}</p>)}
                                </div>
                                <button onClick={handleSortList} className="flex items-center cursor-pointer"><MdSort size={20}/>Sort</button>
                                <button className="flex items-center cursor-pointer"><CiFilter size={20}/>Filter</button>
                            </div>
                        </div>
                        <br />
                        <p className="text-2xl px-6">Movies</p>
                        <br />
                        <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 w-full px-6">
                            {discover &&(
                                discover?.movies?.map((t,i)=>(
                                    <MovieCard1 Key={i} data={t}/>
                                ))
                            )}
                        </div>
                        <br />
                        <p className="text-2xl px-6">Tv Series</p>
                        <br />
                        <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 w-full px-6">
                            {discover &&(
                                discover?.tv?.map((t,i)=>(
                                    <MovieCard1 Key={i} data={t}/>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-5 pt-5 place-items-center">
                        {Array.from({length:5}).map((_,i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                ))
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