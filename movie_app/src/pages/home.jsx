import Satoru from "../assets/satoru.png"
import CarouselComponent from "../components/carousel";
// import { movies } from "../data/testMovies";
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
                    await fetch(`http://localhost:5000/api/${media_type}/${time_window}/trending`)
                    .then(res => res.json())
                    .then(data => {
                        dataMap.set('trending', data.results)
                        setTrending(data.results)
                    })
                    .catch(e => {throw new Error("error: ", e.message);
                    })
                }
            }catch(e){
                console.log('error occurred: ', e.message);
            }
        }
        getTrending()
    },[])

    {/*many problems here */}
    let Slice;
    if(trending){
        Slice = trending?.slice(limit?.start,limit?.end)
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
                         fetch(`http://localhost:5000/api/${types.t1}/genres`),
                         fetch(`http://localhost:5000/api/${types.t2}/genres`)
                    ])
                    const moviesData = await movies.json();
                    
                    const tvData = await tv.json();
                    genresMap.set('genres', [...moviesData.genres, ...tvData.genres])
                    setGenres([...moviesData.genres, ...tvData.genres])
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
        <div className="w-full max-h-full border-red-700">
            <CarouselComponent data={trending}/>
        </div>
    )
}
export default MainPage