import { useEffect, useRef, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel"
import 'bootstrap/dist/css/bootstrap.min.css';

const CarouselComponent = ({data,genres})=>{
    
    const carouselRef = useRef();
    const [index, setIndex] = useState(0);
    
    useEffect(()=>{
        if(!carouselRef?.current) return;
        const interval = setInterval(()=>{
            setIndex(prev=> (prev + 1) % carouselRef?.current?.children.length)
        },5000)

        return ()=> clearInterval(interval)
    },[])

    const navigate = useNavigate()

    const navigateTo = (d)=>{
        navigate(`/details/${d?.id}/${d?.media_type}`)
    }

    return(
        <Carousel>
            {data?.map((d,i) => (
                <Carousel.Item key={i} interval={8000} className="relative">
                    <div className="relative">
                        <img className="w-full h-[92vh] object-cover" src={d.backdrop_path ? `https://image.tmdb.org/t/p/w1280${d.backdrop_path}` : ""} alt=""/>
                        <div title={d?.overview} className="absolute bottom-24 left-40  z-20 text-white max-w-100 min-h-40 bg-black/50 rounded-lg p-2">
                            <p>{d?.name || d?.title}</p>
                            <p>{d?.overview}</p>
                        </div>
                        <button onClick={() => navigateTo(d)} className="absolute bottom-9 left-40 z-20 bg-[#FF3C00] min-w-20 h-14 p-2"><p>watch trailer</p> <p>hello</p></button>
                    </div>
                    
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default CarouselComponent;    