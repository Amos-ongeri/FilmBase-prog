export const getPosterSize = () => {
    const width = window.innerWidth

    if (width < 640) return "w185"
    if (width < 1024) return "w342"

    return "w500"
}

export const getBackdropSize = () => {
    const width = window.innerWidth

    if (width < 640) return "w300"
    if (width < 1024) return "w780"

    return "w1280"
}