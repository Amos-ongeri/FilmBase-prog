import { useState,useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/Cards/MovieCard";

const tvMap = new Map();
const categories = ['airing_today','popular','top_rated','on_the_air'];

const TvSeries = ()=>{
    const [tv, setTv] = useState({
                popular: [],
                top_rated: [],
                on_the_air: [],
                airing_today: []
            })
            const media_type = 'tv'
    useEffect(()=> {
        const fetchtv = async ()=>{
            const results = [];
            let tvData;
            for(const cat of categories){
                if(tvMap.has(cat))
                    results.push({category: cat, tv: tvMap.get(cat)});
                else{
                const { data } = await axios.get(`http://localhost:5000/api/${media_type}/${cat}/list`)
                    if(Array.isArray(data.results)){
                        tvData = data.results.map(item=>({
                            ...item,
                            media_type: media_type
                        }))
                    }else if(typeof data.results === 'object'){
                        tvData = {
                            ...data.results,
                            media_type: media_type
                        }
                    }
                    tvMap.set(cat, tvData);
                    results.push({ category: cat, tv: tvData})
                }
            }
        
            setTv(prev=> {
                const newState = {...prev};
                results.forEach(r=> newState[r.category] = r.tv);
                return newState;
            })
        }
            
        fetchtv()  
    },[])
    useEffect(() => {
        console.log("tv updated:", tv);
    }, [tv]);
    return(
        <div className="w-[95%] min-h-full text-gray-300">
            {tv && (
                <>
                <div className="min-h-0 min-w-full px-10 ">
                <p className="text-white text-2xl">&#128293;airing_today</p>
                <br />
                <div className="grid grid-cols-5 space-y-5">
                {
                    tv['airing_today']?.map((tv,i)=>(
                        <MovieCard Key={i} data={tv}/>
                    ))
                }
            </div>
            </div>
            <br />
            <div className="min-h-0 min-w-full px-10">
                <p className="text-white text-2xl">&#128293;Popular</p>
                <br />
                <div className="grid grid-cols-5 space-y-2">
                {
                    tv['popular']?.map((tv,i)=>(
                        <MovieCard Key={i} data={tv}/>
                    ))
                }
                </div>
            </div>
            <div className="min-h-0 min-w-full px-10">
                <p className="text-white text-2xl">&#128293;on_the_air</p>
                <br />
                <div className="grid grid-cols-5 grid-rows-2 space-y-2 ">
                {
                    tv['on_the_air']?.map((tv,i)=>(
                        <MovieCard Key={i} data={tv}/>
                    ))
                }
                </div>
            </div>
            <br />
            <div className="min-h-0 min-w-full px-10">
                <p className="text-white text-2xl">&#128293;top rated</p>
                <br />
                <div className="grid grid-cols-5 grid-rows-2 space-y-2 ">
                {
                    tv['top_rated']?.map((tv,i)=>(
                        <MovieCard Key={i} data={tv}/>
                    ))
                }
                </div>
            </div>
            </>
            )}
        </div>
    )
}

export default TvSeries;