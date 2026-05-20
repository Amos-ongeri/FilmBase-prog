const serverUrl = import.meta.env.VITE_SERVER_URL;

const tvMap = new Map();
const categoryTv = new Map();
const tvCategories = ['airing_today','popular','top_rated','on_the_air'];

export const getTv = async (page = 1) => {
    const tv = {};

    for(const cat of tvCategories){
        if(tvMap.has(`cat:${page}`)){
            tv[cat] = tvMap.get(`${cat}:${page}`);
        }else{
            const res = await fetch(`${serverUrl}/api/${"tv"}/${cat}/${page}/list`)
            const tvFilms = await res.json();

            tvMap.set(`${cat}:${page}`, tvFilms);

            tv[cat] = tvFilms;

        }
    }
    return tv;
}

export const getCategoryTv = async (category,page = 1) => {
    let categoryTvs = {};

        if(categoryTv.has(`${category}:${page}`)){
            categoryTvs = categoryTv.get(`${category}:${page}`);
        }else{
            const res = await fetch(`${serverUrl}/api/${"tv"}/${category}/${page}/list`);
            const films = await res.json();
            categoryTv.set(`${category}:${page}`, films);
            categoryTvs =  films;
        }
    return categoryTvs;
}