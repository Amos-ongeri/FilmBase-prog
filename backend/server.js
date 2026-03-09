const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/routes')
const keywords = require('./routes/keywordsRoute')
const search = require('./routes/searchRoute')
const genres = require('./routes/genresRoute')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes)
app.use('/api/keywords', keywords)
app.use('/api/query', search)
app.use('/api/get',genres)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`app listening at http://localhost:${PORT}`);
})