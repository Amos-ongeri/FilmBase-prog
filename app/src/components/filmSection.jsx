import MovieCard from "./cards/MovieCard"
import { MovieCard3 } from "./cards/MovieCard3";
import { SmartPagination } from "./smartPagination"
import { useEffect, useRef } from "react";

const FilmSection = ({films, genre, genres, page, total, setPage, type}) => {
    const selectedGenre = genres?.find(g => g?.name === genre);

    const filteredFilms = genre !== "All" ? films?.filter(movie => movie.genre_ids.includes(selectedGenre?.id)) : films

    const cardRefs = useRef([]);

    useEffect(() => {
        cardRefs.current[0]?.scrollIntoView({behavior: "smooth"})
    },[page])

    return (
        <div className="space-y-15">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredFilms?.map((movie,i)=> (
                    <div className="scroll-mt-15" ref={(el) => cardRefs.current[i] = el} key={i}><MovieCard movie={{...movie, media_type: type}} genre={genres} index={i}/></div>
                ))}
            </div>
            <SmartPagination currentPage={page}
                totalPages={total}
                onPageChange={setPage}/>
        </div>
    )
}

export const DiscoverSection = ({films, page, setPage, total}) => {
    useEffect(() => {
        cardRefs.current[0]?.scrollIntoView({behavior: "smooth"})
    },[page])

    const cardRefs = useRef([]);
    return (
        <div className="space-y-15">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {films?.map((t,i) => ( <div className="scroll-mt-15" ref={(el) => (cardRefs.current[i] = el)} key={i}><MovieCard3 t={t} k={t.id}/></div>))}
        </div>
        <SmartPagination currentPage={page}
            totalPages={total}
            onPageChange={setPage}/>

        </div>
    )
}

export const SearchResultSection = ({ results, page, total, setPage }) => {
    let persons = undefined;
    let films = undefined;
        if(results){
        persons = results?.filter(s => s?.media_type === "person");
        films = results?.filter(s => (s.media_type === 'tv' || s.media_type === 'movie') && s.poster_path !== null);
    }

    const top = useRef()
    useEffect(() => {
        top.current?.scrollIntoView({top:0, behavior: "smooth"})
    },[page])

    return (
        <div ref={top} className="space-y-15 scroll-mt-15">
            {persons?.length > 0 && (
                <>
                <p className="my-5 text-lg md:text-2xl">People</p>

                <div className="flex gap-5 overflow-auto">
                    {persons.map((p, i) => (
                    <div key={i} className="w-28 h-fit mb-3 shrink-0 group">
                        {p.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${p.profile_path}`}
                                className="w-28 h-28 rounded-full object-cover border-2 border-border group-hover:border-primary transition"
                                alt=""
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gradient-orange/20 border border-border flex items-center justify-center font-bold text-primary group-hover:border-primary transition">
                                {p.name[0]}
                            </div>
                        )}

                        <p className="text-center">{p.name}</p>
                    </div>
                    ))}
                </div>
                {films?.length === 0 && (
                    <SmartPagination
                        currentPage={page}
                        totalPages={total}
                        onPageChange={setPage}
                    />
                )}
                </>
            )}
            {films?.length > 0 && (
                <>
                <p className="my-5 text-lg md:text-2xl">Film</p>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {films.map((f, i) => (
                    <MovieCard3 key={i} t={f} k={i} />
                    ))}
                </div>
                <SmartPagination
                    currentPage={page}
                    totalPages={total}
                    onPageChange={setPage}
                />
                </>
            )}
        </div>
    )
}

export default FilmSection;