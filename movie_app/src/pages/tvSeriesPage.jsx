import { useState,useEffect } from "react";
import MovieCard1 from "../components/Cards/MovieCard1";
import CardSkeleton from "@/components/skeletons/cards/cardSkeleton";

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
        const fetchTv = async ()=>{
            const results = [];
            let tvData;
            for(const cat of categories){
                if(tvMap.has(cat))
                    results.push({category: cat, tv: tvMap.get(cat)});
                else{
                await fetch(`http://localhost:5000/api/${media_type}/${cat}/list`)
                .then(res => res.json())
                .then(data => {
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
                })
                .catch(e => {throw new Error("error: ", e.message);})
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
            
        fetchTv()  
    },[])
    useEffect(() => {
        console.log("tv updated:", tv);
    }, [tv]);

    const hasTv = [
        tv?.airing_today,
        tv?.on_the_air,
        tv?.popular,
        tv?.top_rated
    ].every(member => member?.length !== 0 && member !== undefined)
    
    return(
        <div className="w-full min-h-full text-gray-300">
            {hasTv ? (
                <>
                <div className="min-h-0 min-w-full px-10 ">
                <p className="text-white text-2xl">&#128293;airing_today</p>
                <br />
                <div className="grid grid-cols-5 space-y-5">
                {
                    tv['airing_today']?.map((tv,i)=>(
                        <MovieCard1 Key={i} data={tv}/>
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
                        <MovieCard1 Key={i} data={tv}/>
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
                        <MovieCard1 Key={i} data={tv}/>
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
                        <MovieCard1 Key={i} data={tv}/>
                    ))
                }
                </div>
            </div>
            </>
            ) : (
                <div className="grid grid-cols-5 place-items-center pt-5">
                    {Array.from({length:5}).map((_,i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TvSeries;