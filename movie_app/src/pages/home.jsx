import Satoru from "../assets/satoru.png"
import CarouselComponent from "../components/carousel";
// import { movies } from "../data/testMovies";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import HomeSkeleton from "@/components/skeletons/homeSkeleton";
import { getGenres } from "@/services/api";


const dataMap = new Map();

const MainPage = () => {
    const [trending, setTrending] = useState()
    const [genres,setGenres] = useState()
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
    // let Slice;
    // if(trending){
    //     Slice = trending?.slice(limit?.start,limit?.end)
    // }

    useEffect(()=>{
        const initGenres = async () => {
            const gs = await getGenres()
            setGenres(gs)
        }
        initGenres()
     },[])
    useEffect(()=>{
        console.log('genres', genres);
    },[genres])
    useEffect(()=>{
        console.log('trending', trending);
    },[trending])

    return(
        <div className="relative  w-full min-h-full">
            {trending !== undefined ? <CarouselComponent data={trending} genres={genres}/> : <HomeSkeleton />}
        </div>
    )
}
export default MainPage