//get new film every week
export const getFeaturedMovie = (movies) => {
  if (!movies?.length) return null;

  const validMovies = movies
    .filter(
      (movie) =>
        movie.backdrop_path &&
        movie.overview
    )
    .sort((a, b) => b.popularity - a.popularity);

  const weekMs = 1000 * 60 * 60 * 24 * 7;

  const currentWeek = Math.floor(Date.now() / weekMs);

  const index = currentWeek % validMovies.length;

  return validMovies[index];
};