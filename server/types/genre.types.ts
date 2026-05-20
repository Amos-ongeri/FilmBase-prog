type Genre = {
    id?: number | null
    name?: string | null
}

export type GenreParams = {
    type: string
}

export type GenreResponse = {
    genre?: Genre[]
}