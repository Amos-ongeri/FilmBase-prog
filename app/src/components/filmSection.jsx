import MovieCard from "./cards/MovieCard"
import { SmartPagination } from "./smartPagination"

const FilmSection = ({films, genre, genres, page, total, setPage, type}) => {
    const selectedGenre = genres?.find(g => g?.name === genre);

    const filteredFilms = genre !== "All" ? films?.filter(movie => movie.genre_ids.includes(selectedGenre.id)) : films

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {filteredFilms?.map((movie,i)=> (
                    <MovieCard key={i} movie={{...movie, media_type: type}} genre={genres} index={i}/>
                ))}
            </div>
            <br />
            <SmartPagination currentPage={page}
                totalPages={total}
                onPageChange={setPage}/>
            <br />
</div>
    )
}

export default FilmSection;