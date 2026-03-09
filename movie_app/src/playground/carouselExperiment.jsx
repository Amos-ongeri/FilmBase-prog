import { useEffect, useState } from "react";
import satoru from "../assets/satoru.png";

export default function Carousel({data}) {
  const [index, setIndex] = useState(0);

    useEffect(()=>{
      if(!data || data.length == 0) return;
        const interval = setInterval(()=>{
            setIndex((prevIndex)=>(prevIndex + 1) % data.length)
        },8000)
        return ()=> clearInterval(interval);
    },[data])

  return (
    <div className="relative w-full h-110 ml-auto mr-auto overflow-hidden mask-b-from-50%">
        <div className="flex w-full h-full" style={{transform: `translateX(-${index * 100}%)`, transition: "transform 0.5s ease"}}>
            {data?.map((d, i)=>(
                <img loading="lazy" key={i} className="w-full h-full object-cover borderobject-center shrink-0" src={`https://image.tmdb.org/t/p/w1280${d.backdrop_path}` || ''} />
            ))}
        </div>
        <div className="absolute top-4 right-3 flex justify mt-4 space-x-2">
        {data?.map((d, idx) => {
          return <span
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
              index === idx ? "bg-yellow-300" : "bg-gray-300"
            }`}
          ></span>
        })}
    </div>
    </div>
    
  );
}
