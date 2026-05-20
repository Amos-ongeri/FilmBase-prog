const serverUrl = import.meta.env.VITE_SERVER_URL;

const discoverMap = new Map();
const typeMap = new Map();

export const getDiscover = async (page) => {
    const types = {
        t1: 'movie',
        t2: 'tv'
    }
    let discoverData = {}
    try{
        if(discoverMap.has(`movie:${page}`) && discoverMap.has(`tv:${page}`)){
            discoverData["movies"] = discoverMap.get(`movie:${page}`);
            discoverData["tv"] = discoverMap.get(`tv:${page}`);
        }else{
            const [movie, tv] = await Promise.all([
                fetch(`${serverUrl}/api/discover/${types.t1}/${page}`),
                fetch(`${serverUrl}/api/discover/${types.t2}/${page}`)
            ])

            const movies = await movie.json()

            const Tv = await tv.json()

        discoverMap.set(`movie:${page}`, movies)
        discoverMap.set(`tv:${page}`, Tv)
        discoverData['movies'] = movies;
        discoverData['tv'] = Tv;
        }

        return discoverData;

    }catch(e){
        console.log('error occurred: ', e.message);
    }
}

export const getTypeDiscover = async (type,page) => {
    let discoverData = {}
    try{
        if(typeMap.has(`movie:${page}`) && typeMap.has(`tv:${page}`)){
            discoverData = typeMap.get(`${type}:${page}`);
        }else{
            const res = await fetch(`${serverUrl}/api/discover/${type}/${page}`);

            const movies = await res.json()

            typeMap.set(`movie:${page}`, movies)
            discoverData = movies;
        }

        return discoverData;

    }catch(e){
        console.log('error occurred: ', e.message);
    }
}