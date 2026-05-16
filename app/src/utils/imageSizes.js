export const getPosterSize = () => {
    const width = window.innerWidth

    const dpr = window.devicePixelRatio || 1

    const effectiveWidth = width * dpr

    if (effectiveWidth < 640) return "w185"
    if (effectiveWidth < 1024) return "w342"

    return "w500"
}

export const getBackdropSize = () => {
    const width = window.innerWidth

    const dpr = window.devicePixelRatio || 1

    const effectiveWidth = width * dpr

    if (effectiveWidth < 640) return "w300"
    if (effectiveWidth < 1280) return "w780"

    return "w1280"
}

export const getLogoSize = () => {
    const width = window.innerWidth

    const dpr = window.devicePixelRatio || 1

    const effectiveWidth = width * dpr

    if (effectiveWidth < 640) return "w185"
    if (effectiveWidth < 1280) return "w300"

    return "w500"
}