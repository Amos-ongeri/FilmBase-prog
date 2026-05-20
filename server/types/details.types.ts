type Creator = {
    credit_id?: string | null
    gender?: number | null
    id?: number | null
    name?: string
    original_name?: string | null
    profile_path?: string | null
}

type Genre = {
    id?: number | null
    name?: string | null
}

type LastEpisode = {
    air_date?: string | null
    episode_number?: number | null
    episode_type?: string | null
    id?: number | null
    name?: string | null
    overview?: string | null
    production_code?: string | null
    runtime?: number | null
    season_number?: number | null
    show_id?: number | null
    still_path?: string | null
    vote_average?: number | null
    vote_count?: number | null
}

type Network = {
    id?: number | null
    logo_path?: string | null
    name?: string | null
    origin_country?: string | null
}

type ProductionCountry = {
    iso_3166_1?: string | null
    name?: string | null
}

type Season = {
    air_date?: string | null
    episode_count?: number | null
    id?: number | null
    overview?: string | null
    poster_path?: string | null
    season_number?: number | null
    vote_average?: number | null
}

type SpokenLanguage = {
    english_name?: string | null
    iso_639_1?: string | null
    name?: string | null
}

export type DetailsParams = {
    id: string
    media_type: string
}

export type DetailsResponse = {
    adult?: boolean | null
    backdrop_path?: string | null
    created_by?: Creator[]
    episode_run_time:[]
    first_air_date?: string | null
    genres?: Genre[]
    homepage?: string | null
    id?: number | null
    in_production?: boolean | null
    languages?: string[]
    last_air_date?: string | null
    last_episode_to_air?: LastEpisode
    name?: string | null
    networks?: Network[]
    number_of_episodes?: number | null
    number_of_seasons?: number | null
    origin_country?: ['US']
    original_language?: string | null
    original_name?: string | null
    overview?: string | null
    popularity?: number | null
    poster_path?: string | null
    production_companies?: Network[]
    production_countries?: ProductionCountry[]
    seasons?: Season[]
    softcore?: boolean | null
    spoken_languages?: SpokenLanguage[]
    status?: string | null
    tagline?: string | null
    type?: string | null
    vote_average?: number | null
    vote_count?: number
}