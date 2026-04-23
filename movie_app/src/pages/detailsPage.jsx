import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import { movies } from "../../data/testMovies";
import MovieCard1 from "../components/Cards/MovieCard1";
import avatar from '../assets/user-avatar.png'
import { MdArrowForward, MdArrowForwardIos } from "react-icons/md";
import CardSkeleton from "@/components/skeletons/cards/cardSkeleton";

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
                const details = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/details`)
                Details = await details?.json();

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
                const videos = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/videos`)
                const videosData = await videos.json();
                Videos = videosData.results;
                trailer = Videos?.filter(d=> d.type === 'Trailer')
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
                    const credits = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/credits`)
                    const creditsData = await credits.json();
                    creditsMap.set(tmdb_id,creditsData)
                    setCredits(creditsData)
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
                    const similar = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/similar`)
                    const similarData = await similar.json();
                    console.log(similarData);
                    similarData.results = similarData?.results?.map(item=>({
                        ...item,
                        media_type: media_type
                    }))
                    similarMap.set(tmdb_id,similarData)
                    setSimilar(similarData.results)
                }
            }catch(e){
                console.log('error occurred: ',e.message);
            }
        }
        const getReviews = async ()=>{
            try{
                if(reviewsMap.has(tmdb_id)){
                    setReviews(reviewsMap.get(tmdb_id))
                }else{
                    const reviews = await fetch(`http://localhost:5000/api/${tmdb_id}/${media_type}/reviews`)
                    const reviewsData = await reviews.json();
                    reviewsMap.set(tmdb_id,reviewsData)
                    setReviews(reviewsData.results)
                }
            }catch(e){
                console.log('error occurred: ',e.message);
            }
        }

        getReviews()
        getSimilar()
        getCredits()
        getVideos()
        getDetails();
    },[media_type, tmdb_id])
    useEffect(() => {
      console.log("details updated:", details);
      console.log('videos updated:',videos);
      console.log('credit updated:',credits);
        console.log('similar updated:',similar);
        console.log('reviews updated:',reviews);
      console.log(location.pathname);

    }, [videos, details, credits, similar, reviews]);
    let castNullFilter,crewNullFilter,VISIBLE_CAST,VISIBLE_CREW,similarNullFilter = []

    if(credits){
        castNullFilter = credits?.cast?.filter(c=> c.profile_path !== null)
        crewNullFilter = credits?.crew?.filter(c=> c.profile_path !== null)
    }

    if(similar){
        similarNullFilter = similar?.filter(m=> m.poster_path !== null)
    }
    
    const toggleExpand = (id)=>{
        setExpand(prev=>{
            const copy = new Set(prev)
            copy.has(id) ? copy.delete(id) : copy.add(id)
            return copy;
        })
    }
    const reviewsRef = useRef()
    const [reviewsToggled, setReviewsToggled] = useState(false)
    const toggle = () => {
        reviewsRef?.current?.classList?.toggle("hidden");
        setReviewsToggled(prev => !prev);
    }
    const modal = useRef();

    const altModalClose = (e) => {
        const posModal = modal.current.getBoundingClientRect();
        const outPos = e.clientX < posModal.left || e.clientX > posModal.right || e.clientY < posModal.top || e.clientY > posModal.bottom;

        if(outPos){
            modal.current.close();
        }
    }

    return(
        <>
        <div className="min-w-full min-h-full pb-5 text-gray-300">
            <div className="w-full h-fit">
                    <div className="flex gap-3 h-fit w-full">
                    {videos?.length > 0 && (
                    <iframe 
                    width={1000}
                    height={500}
                    title={videos?.[0]?.name}
                    key={videos?.[0]?.key}
                    src={`https://www.youtube.com/embed/${videos?.[0]?.key}?rel=0` }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-cover w-full h-96 object-center mask-b-from-85%">
                    </iframe>
                    )}
                </div>
                {details && (
                    <div className="">
                        <p className="text-2xl">{details?.title || details?.name}</p>
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
                <dialog onClick={(e) => altModalClose(e)} 
                className="m-auto w-[60%] h-[80%] rounded-2xl overflow-hidden bg-slate-900 text-white" ref={modal}>
                    <div className="flex justify-between p-2 h-[7%]">
                        <div></div>
                        <a className="pr-3 hover:underline cursor-pointer text-lg text-red-500" onClick={() => modal.current.close()}>close</a>
                    </div>
                    <div className="flex gap-[2%] h-[91%] w-full p-2">
                        <div className="w-[49%] h-full">
                            <div className="">
                                <p className="text-2xl z-20">Top Cast ({castNullFilter?.length})</p>
                            </div>
                            <br />
                            <div className="h-[90%] max-w-full overflow-auto transition-all duration-500 mask-b-from-90% mask-t-from-90%">
                                { credits && (
                                    credits?.cast?.map((c,i)=>(
                                        <div key={i} className="flex items-center gap-3 h-20 w-full">
                                            <img key={i} src={c.profile_path !== null ? `https://image.tmdb.org/t/p/w500${c.profile_path}` : avatar} alt="" className="h-16 w-16 rounded-full object-cover"/>
                                            <div>
                                                <p>{c?.name}</p>
                                                <p>{c?.known_for_department}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="w-[49%] h-full">
                            <div className="">
                                <p className="text-2xl ">Crew ({crewNullFilter?.length})</p>
                            </div>
                            <br />
                            <div className="h-[90%] min-w-1/2 overflow-auto transition-all duration-500 mask-b-from-90% mask-t-from-90%">
                                { credits && (
                                    credits?.crew?.map((c,i)=>(
                                        <div key={i} className="flex items-center gap-3 h-20 w-full rounded-lg">
                                            <img src={c.profile_path !== null ? `https://image.tmdb.org/t/p/w500${c.profile_path}` : avatar} alt="" className="h-16 w-16 rounded-full object-cover"/>
                                            <div>
                                                <p>{c?.name}</p>
                                                <p>{c?.known_for_department}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
            </dialog>
            )}
            <br />
            <div ref={reviewsRef} className="hidden w-full min-h-70">
                {reviews && (
                    <div className="w-full h-full space-y-4">
                    <p className="text-2xl">{reviews.length} user reviews</p>
                    <ol className="h-full space-y-8">
                        {reviews.map((r) => (
                        <div key={r.id} className="flex space-y-4">
                            <img src={r.author_details.avatar_path !== null ? `https://image.tmdb.org/t/p/w500/${r.author_details.avatar_path}` : avatar} alt="" className="w-10 h-10 rounded-full" />
                            <div className="w-full min-h-fit justify-between px-5 space-y-2">
                                <p>{r.author_details.name || r.author}</p>
                                <p className={`pl-2 rounded-tl-xs rounded-bl-xs transition-height duration-75 ease-in ${expand.has(r.id) ? '' : 'line-clamp-3'}`}>{r.content}</p>
                                <button onClick={() => toggleExpand(r.id)} className="flex space-x-1 p-1 rounded-lg items-center transition-all duration-200 cursor-pointer float-right group">...<p className="group-hover:underline">{expand.has(r.id) ? 'show less' : 'show more'}</p></button>
                            </div>
                        </div>
                        ))}
                    </ol>
                </div>
                )}
            </div>
            <br />
            {similar && (
                    <div className="relative space-y-4 w-full items-center">
                        <div className="flex justify-between">
                            <p className="text-2xl z-20 ml-2">{similarNullFilter.length} Similar Titles</p>
                            <button onClick={() => modal.current.showModal()} data-open-modal className="border border-slate-800 rounded-lg p-2">cast&crew</button>
                            {(reviews && reviews?.length !== 0) && (<button onClick={toggle} className="border border-slate-800 rounded-lg p-2 mr-2 hover:bg-[#FF3C00] hover:text-slate-900 hover:border-0 transition-colors     duration-150">{reviewsToggled ? "Close Reviews" : "See Reviews"}</button>)}
                        </div>
                    <div className="w-full place-items-center min-h-50 grid lg:grid-cols-5 sm:grid-cols-3 sm:gap-4 lg:gap-2">
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
        </>
    )
}

export default Detail;