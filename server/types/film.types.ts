export type FilmParams = {
    media_type: string
    category: string
    page: string
}

type Film = {
    adult?: boolean | null
    backdrop_path?: string | null
    genre_ids?: number[] | null
    id?: number | null
    name?: string | null
    title?: string | null
    origin_country?: string[] | null
    original_language?: string | null
    original_title?: string | null
    overview?: string | null
    popularity?: number | null
    release_date?: string | null
    poster_path?: string | null
    softcore?: boolean | null
    video?: boolean | null
    vote_average?: number | null
    vote_count?: number | null
}

export type TrendingParams = {
    media_type: string
    time_window: string
}

export type FilmResponse = {
    page?: number
    results?: Film[]
    total_pages?: number
    total_results?: number
}