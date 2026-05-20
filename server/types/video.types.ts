type Video = {
    id?: string | null
    iso_639_1?: string | null
    iso_3166_1?: string | null
    name?: string | null
    official?: boolean | null
    published_at?: string | null
    site?: string | null
    size?: number | null
    type?: string | null
}

export type VideosResponse = {
    id?: number | null
    results?: Video[]
}

export type VideosParams = {
    id: string
    media_type: string
}