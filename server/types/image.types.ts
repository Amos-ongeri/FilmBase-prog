type Image = {
    aspect_ratio?: number
    file_path?: string
    height?: number
    iso_639_1?: string
    iso_3166_1?: string
    vote_average?: number
    vote_count?: number
    width?: number
}

export type ImageParams = {
    media_type: string
    id: string
}

export type ImageResponse = {
    backdrops?: Image[]
    id?: number
    logos?: Image[]
    posters?: Image[]
}