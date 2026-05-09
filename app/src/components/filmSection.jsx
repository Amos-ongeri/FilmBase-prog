import MovieCard from "./cards/MovieCard"
import { SmartPagination } from "./smartPagination"

const FilmSection = ({films, genre, genres, page, total, setPage, type}) => {

    return (
        (genre !== "All" ? (
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {films?.map((movie,i)=> {
                        let m = {...movie, media_type: type}
                        const gen = genres?.find(g => g?.name === genre)

                        if(movie?.genre_ids?.includes(gen?.id)){
                            return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                        }
                    })}
                    </div>
                    <br />
                    <SmartPagination currentPage={page}
                        totalPages={total}
                        onPageChange={setPage}/>
                    <br />
                </div>
        ) : (
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {films?.map((movie,i)=> {
                        let m = {...movie, media_type: type}
                        return <MovieCard key={i} movie={m} genre={genres} index={i}/>
                    })}
                </div>
                <br />
                <SmartPagination currentPage={page}
                    totalPages={total}
                    onPageChange={setPage}/>
                <br />
            </div>
        ))
    )
}

export default FilmSection;