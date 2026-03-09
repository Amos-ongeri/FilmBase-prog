import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { movies } from "../../data/testMovies";
import MovieCard1 from "../components/Cards/MovieCard1";
import avatar from '../assets/user-avatar.png'
import { MdArrowForward, MdArrowForwardIos } from "react-icons/md";

const detailsMap = new Map();
const videosMap = new Map();
const creditsMap = new Map();
const similarMap = new Map();
const reviewsMap = new Map();

const Detail = ()=>{
    const {tmdb_id, media_type} = useParams()
    console.log(tmdb_id);

    const [details, setDetails] = useState();
    const [videos, setVideos] = useState([]);
    const [credits, setCredits] = useState();
    const [similar,setSimilar] = useState();
    const [reviews,setReviews] = useState();
    const [expand,setExpand] = useState(new Set());

    useEffect(()=>{
        const getDetails = async ()=>{
            try{
            let Details;
            if(detailsMap.has(tmdb_id)){
                setDetails(detailsMap.get(tmdb_id))
            }else{
                const details = await axios.get(`http://localhost:5000/api/${tmdb_id}/${media_type}/details`)
                Details = details.data;
                detailsMap.set(tmdb_id,Details);
                setDetails(Details);
            }
            }catch(e){
                console.log(e.message);
                
            }
            
        }

        const getVideos = async ()=>{
            try{
            let Videos,trailer;
            if(videosMap.has(tmdb_id)){
                setVideos(videosMap.get(tmdb_id))
            }else{
                const videos = await axios.get(`http://localhost:5000/api/${tmdb_id}/${media_type}/videos`)
                Videos = videos.data.results;
                trailer = Videos.filter(d=> d.type === 'Trailer')
                videosMap.set(tmdb_id ,trailer);
                setVideos(trailer)
            }
            }catch(e){
                console.log(e.message);
            }
        }

        const getCredits = async ()=>{
            try{
                if(creditsMap.has(tmdb_id)){
                    setCredits(creditsMap.get(tmdb_id))
                }else{
                    const {data} = await axios.get(`http://localhost:5000/api/${tmdb_id}/${media_type}/credits`)
                    creditsMap.set(tmdb_id,data)
                    setCredits(data)
                }
            }catch(e){
                console.log(e.message);
            }
        }

        const getSimilar = async ()=>{
            try{
                if(similarMap.has(tmdb_id)){
                    setSimilar(similarMap.get(tmdb_id))
                }else{
                    const { data } = await axios.get(`http://localhost:5000/api/${tmdb_id}/${media_type}/similar`)
                    const similarData = data.results.map(item=>({
                        ...item,
                        media_type: media_type
                    }))
                    similarMap.set(tmdb_id,similarData)
                    setSimilar(similarData)
                }
            }catch(e){
                console.log('error occured: ',e.message);
            }
        }
        const getReviews = async ()=>{
            try{
                if(reviewsMap.has(tmdb_id)){
                    setReviews(reviewsMap.get(tmdb_id))
                }else{
                    const{ data } = await axios.get(`http://localhost:5000/api/${tmdb_id}/${media_type}/reviews`)
                    reviewsMap.set(tmdb_id,data.results)
                    setReviews(data.results)
                }
            }catch(e){
                console.log('error occured: ',e.message);
            }
        }

        getReviews()
        getSimilar()
        getCredits()
        getVideos()
        getDetails();
    },[tmdb_id])
    useEffect(() => {
      console.log("details updated:", details);
      console.log('videos updated:',videos);
      console.log('credit updated:',credits);
        console.log('similar updated:',similar);
        console.log('reviews updated:',reviews);
      console.log(location.pathname);
      
    }, [videos,details]);
    let castNullFilter,crewNullFilter,VISIBLE_CAST,VISIBLE_CREW,similarNullFilter = []
    let sliceAmount = 2
    const [castShowMore, setCastShowMore] = useState(false)
    const [crewShowMore, setCrewShowMore] = useState(false)
    if(credits){
        castNullFilter = credits?.cast?.filter(c=> c.profile_path !== null)
        crewNullFilter = credits?.crew?.filter(c=> c.profile_path !== null)
        sliceAmount = Math.min(castNullFilter.length, sliceAmount)
        VISIBLE_CAST  = castShowMore ? castNullFilter : castNullFilter.slice(0,sliceAmount)
        VISIBLE_CREW  = crewShowMore ? crewNullFilter : crewNullFilter.slice(0,sliceAmount)
    }

    if(similar){
        similarNullFilter = similar.filter(m=> m.poster_path !== null)
    }
    
    const toggleExpand = (id)=>{
        setExpand(prev=>{
            const copy = new Set(prev)
            copy.has(id) ? copy.delete(id) : copy.add(id)
            return copy;
        })
    }
    return(
        <div className="min-w-full min-h-full pb-5 px-10 text-gray-300">
            <div className="flex w-full min-h-40">
                <div className="w-[77%] h-fit">
                    <div className="flex gap-3 h-fit w-[95%]">
                    {videos.length > 0 && (
                    <iframe 
                    width={1000}
                    height={500}
                    key={videos?.[0]?.key}
                    src={`https://www.youtube.com/embed/${videos?.[0]?.key}?rel=0` }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-cover w-full h-120 object-center mask-b-from-85% rounded-lg">
                    </iframe>
                    )}
                </div>
                {details && (
                    <div className="">
                        <p>{details?.title || details?.name}</p>
                        <br />
                        <div className="flex space-x-2 min-h-7 w-70 flex-wrap space-y-2 mask-b-from-70%">
                            {details?.genres?.map(element => (
                                <p key={element.id} className="text-white h-full min-w-20 flex items-center justify-center rounded-lg bg-gray-700/50">{element.name}</p>
                            ))}
                        </div>
                        <p className="text-sm">{details.overview}</p>
                    </div>
                )}
                <br />
                <div className="px-10">
                    <hr className="border-gray-700"/>
                </div>
                </div>
                {credits && (
                <div className="min-h-40 w-[23%] space-y-2">
                <div className="w-full h-[50%]">
                    <div className="flex justify-between">
                        <p className="text-2xl z-20">top cast ({castNullFilter?.length})</p>
                        {
                        credits && (
                            castNullFilter.length > sliceAmount && (
                                <button onClick={()=> setCastShowMore(!castShowMore)} className="rounded-lg bg-gray-700/50 p-1 cursor-pointer flex items-center">{castShowMore ? 'less' : 'more' } {<MdArrowForward/>}</button>
                            )
                        )
                        }
                    </div>
                    <br />
                    <div className="flex justify-center space-x-2 min-h-50 w-full transition-all duration-500">
                        { credits && (
                            VISIBLE_CAST?.map((c,i)=>(
                                <div key={i} className="h-full w-30 rounded-lg">
                                    <img key={i} src={`https://image.tmdb.org/t/p/w500${c.profile_path}`} alt="" className="h-40 w-30 rounded-lg"/>
                                    <p>{c.name}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="w-full h-[50%]">
                    <div className="flex justify-between">
                        <p className="text-2xl ">crew ({crewNullFilter?.length})</p>
                        {
                        credits && (
                            crewNullFilter.length > sliceAmount && (
                                <button className="rounded-lg bg-gray-700/50 p-1 cursor-pointer flex items-center" onClick={()=>setCrewShowMore(!crewShowMore)}>{crewShowMore ? 'less':'more'}{<MdArrowForward/>}</button>
                            )
                        )
                        }
                    </div>
                    <br />
                    <div className="flex justify-center space-x-2 min-h-50 w-full transition-all duration-500 ">
                        { credits && (
                            VISIBLE_CREW?.map((c,i)=>(
                                <div key={i} className="h-full w-30 rounded-lg">
                                    <img src={`https://image.tmdb.org/t/p/w500${c.profile_path}`} alt="" className="h-40 w-30 rounded-lg"/>
                                    <p>{c.name}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            )}
            </div>
            <br />
            <div className="flex space-x-2 w-full min-h-70">
                {reviews && (
                    <div className="w-[60%] h-full space-y-4">
                    <p className="text-2xl">{reviews.length} user reviews</p>
                    <ol className="h-full space-y-8">
                        {reviews.map((r,i) => (
                        <div key={r.id} className="flex space-y-4">
                            <img src={r.author_details.avatar_path !== null ? `https://image.tmdb.org/t/p/w500/${r.author_details.avatar_path}` : avatar} alt="" className="w-10 h-10 rounded-full" />
                            <div className="w-full min-h-fit justify-between px-5 space-y-2">
                                <p>{r.author_details.name || r.author}</p>
                                <p className={`pl-2 rounded-tl-xs rounded-bl-xs transition-height duration-75 ease-in ${expand.has(r.id) ? '' : 'line-clamp-3'}`}>{r.content}</p>
                                <button onClick={() => toggleExpand(r.id)} className="flex space-x-1 p-1 bg-gray-700 rounded-lg items-center transition-all duration-200 cursor-pointer hover:bg-gray-500/20"><p className="">{expand.has(r.id) ? 'show less' : 'show more'}</p></button>
                            </div>
                        </div>
                        ))}
                    </ol>
                </div>
                )}
                {similar && (
                    <div className="space-y-4 w-[40%] items-center">
                    <p className="text-2xl z-20">{similarNullFilter.length} Similar Titles</p>
                    <div className="w-full place-items-center min-h-50 grid grid-cols-2 gap-2">
                        {
                            similar && (
                                similarNullFilter.map(s=>(
                                    <MovieCard1 data={s}/>
                                ))
                            )
                        }
                    </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Detail;