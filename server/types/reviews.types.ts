type Author = {
    avatar_path?: string | null
    name?: string | null
    rating?: number | null
    username?: string | null
}

type Review = {
    author?: string | null
    author_details?: Author
    content?: string | null
    created_at?: string | null
    id?: string | null
    updated_at?: string | null
    url?: string | null
}

export type ReviewsResponse = {
    id?: number
    page?: number
    results?: Review[]
    total_pages?: number
    total_results?: number
}

export type ReviewParams = {
    id: string
    media_type: string
}