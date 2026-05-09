const dotenv = require('dotenv');
dotenv.config();

class tmdbClient{
    constructor() {
        this.Base = 'https://api.themoviedb.org/3';
        this.token = process.env.TMDB_BEARER_TOKEN;

        this.headers = {
            Authorization: `Bearer ${this.token}`,
            'content-type': 'application/json'
        }
    }

    async request(path){
        const res = await fetch(`${this.Base}${path}`,{
            method: "GET",
            headers: this.headers
        })
        if(!res.ok){
            const error = await res.json().catch(()=>({}))
            throw new Error(`Tmdb error ${res.status} : ${error.status_message || res.statusText}`)
        }

        return res.json();
    }
}

module.exports = { tmdbClient };