type Provider = {
    display_priority?: number
    logo_path?: string
    provider_id?: number
    provider_name?: string
}
type Result ={
    ads?: Provider[]
    buy?: Provider[]
    flatrate?: Provider[]
    link?: string
    rent?: Provider[]
}

export type ProvidersResponse = {
    id?: number
    results?: Result[]
}

export type ProviderParams = {
    media: string
    id: string
}