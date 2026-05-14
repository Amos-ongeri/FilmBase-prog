import Satoru from "../assets/satoru.png"
import CarouselComponent from "../components/imageCarousel";
// import { movies } from "../data/testMovies";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import HomeSkeleton from "@/components/placeholders/homeSkeleton";
import { getGenres, getTrending } from "@/services/api";


const MainPage = () => {
    const [trending, setTrending] = useState()
    const [genres,setGenres] = useState()
    const media_type = 'all';
    const time_window = 'week'

    const initTrending = async () => {
        const trends = await getTrending(media_type, time_window);

        setTrending(trends);
    }

    const initGenres = async () => {
        const gs = await getGenres()
        setGenres(gs)
    }
    useEffect(()=>{
        const loadData = async ()=>{
            await Promise.all([initTrending(), initGenres()])
        }
        loadData()
    },[])

    {/*many problems here */}
    // let Slice;
    // if(trending){
    //     Slice = trending?.slice(limit?.start,limit?.end)
    // }

    return(
        <div className="relative w-full min-h-full bg-foreground dark:bg-background text-accent-foreground">
            {trending !== undefined ? <CarouselComponent data={trending} genres={genres}/> : <HomeSkeleton />}
            <div className="h-50 w-full"></div>
        </div>
    )
}
export default MainPage