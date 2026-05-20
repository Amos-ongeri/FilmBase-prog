type Credit = {
    adult?: boolean
    cast_id?: number
    character?: string
    credit_id?: string
    department?: string
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    order?: number
    original_name?: string
    popularity?: number
    profile_path?: string
}

export type CreditParams = {
    id: string
    media_type: string
}

export type CreditsResponse = {
    cast?: Credit[]
    crew?: Credit[]
    id?: number
}