import Satoru from "../assets/satoru.png"
import Carousel from "../components/carousel";
// import { movies } from "../data/testMovies";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard2 from "../components/Cards/MovieCard2";
import MovieCard from "../components/Cards/MovieCard";
import MovieCard1 from "../components/Cards/MovieCard1";
import Banner from "../components/Banner";
import { MdArrowBack, MdArrowForward } from "react-icons/md";


const dataMap = new Map();
const genresMap = new Map();

const MainPage = () => {
    const [trending, setTrending] = useState()
    const [genres,setGenres] = useState()
    const [limit,SetLimit] = useState({start: 0, end: 3})
    const media_type = 'all';
    const time_window = 'week'
    useEffect(()=>{
        const getTrending = async ()=>{
            try{
                if(dataMap.has('trending')){
                    setTrending(dataMap.get('trending'))
                }else{
                const { data } = await axios.get(`http://localhost:5000/api/${media_type}/${time_window}/trending`)
                dataMap.set('trending', data.results)
                setTrending(data.results)
                }
            }catch(e){
                console.log('error occured: ', e.message);
            }
        }
        getTrending()
    },[])

    {/*many problems here */}
    let Slice;
    if(trending){
        Slice = trending?.slice(limit?.start,limit?.end)
    }

    const handlePrevious = ()=>{
        SetLimit(prev=>{
            const newStart = Math.max(prev.start - 3, 0)
            const newEnd = Math.min(newStart + 3, trending.length)
            return {start: newStart,end: newEnd}
        })
    }

    const handleNext = ()=>{
        SetLimit(prev=>{
            const newEnd = Math.min(prev.end + 3, trending.length)
            const newStart = Math.max(newEnd - 3, 0)
            return {start: newStart,end: newEnd}
        })
    }

    const filter = (arr,genre)=>{
        const filtered = arr?.filter(g => g.name === genre)
        return filtered?.[0]?.id
    }

    useEffect(()=>{
        const getGenres = async ()=>{
            const types = {
                t1: 'movie',
                t2: 'tv'
            }
            try{
                if(genresMap.has('genres')){
                    setGenres(genresMap.get('genres'))
                }else{
                    const [ movies, tv ] = await Promise.all([
                         axios.get(`http://localhost:5000/api/movies/${types.t1}/genres`),
                         axios.get(`http://localhost:5000/api/movies/${types.t2}/genres`)
                    ])
                    genresMap.set('genres', [...movies.data.genres, ...tv.data.genres])
                    setGenres([...movies.data.genres, ...tv.data.genres])
                }
            }catch(e){
                console.log('error: ',e.message);
                
            }
        }
        getGenres()
        console.log('component mounted');
        
    },[])
    useEffect(()=>{
        console.log('genres', genres);        
    },[genres])
    useEffect(()=>{
        console.log('trending', trending);        
    },[trending])

    return(
        <div className="w-[95%] h-full">
            <Carousel data={trending}/>
            {/* <Banner data={trending} genres={genres}/> */}
            <div className="">
                <div className="w-[95%] min-h-80 mx-6  rounded-2xl bg-black/30">
                <br />
                <div className="flex justify-between mx-10 p-1  border border-gray-300/10 rounded-lg min-w-40 max-w-55">
                    <p className="text-white text-lg w-[40%] ">Trending</p>
                    <div className="flex text-white text-lg justify-evenly w-50 ">
                        <p className="px-5 rounded-sm text-black bg-amber-100">day</p>
                        <p className="">week</p>
                    </div>
                </div>
                <br />
                {/*many problems here */}
                <div className="relative flex justify-center space-x-5">
                    <button onClick={handlePrevious} className={`absolute top-[50%] left-10 cursor-pointer bg-gray-300/50 hover:bg-gray-300 rounded-lg p-2 transition-opacity duration-75 ${limit?.start === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>{<MdArrowBack size={20}/>}</button>
                    <button onClick={handleNext} className={`absolute top-[50%] right-10 cursor-pointer bg-gray-300/50 hover:bg-gray-300 rounded-lg p-2 transition-opacity duration-75 ${limit?.end === trending?.length ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>{<MdArrowForward size={20}/>}</button>
                    {Slice && (
                    Slice?.map((t,i)=>(
                        <MovieCard2 data={t}/>
                    ))
                )}
                </div>
                <br />
                </div>
            </div>
        </div>
    )
}
export default MainPage