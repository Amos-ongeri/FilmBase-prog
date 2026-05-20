import { configsRouter } from "./routes/configs.route";
import { creditsRouter } from "./routes/credits.route";
import { detailsRouter } from "./routes/details.route";
import { discoverRouter } from "./routes/discover.route";
import { filmRouter } from "./routes/film.route";
import { genreRouter } from "./routes/genre.route";
import { imagesRouter } from "./routes/images.route";
import { keywordsRouter } from "./routes/keywordsRoute";
import { providerRouter } from "./routes/provider.route";
import { reviewRouter } from "./routes/reviews.route";
import { searchRouter } from "./routes/search.route";
import { similarRouter } from "./routes/similar.route";
import { trendingRouter } from "./routes/trending.route";
import { videoRouter } from "./routes/videos.route";

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', configsRouter)
app.use('/api', creditsRouter)
app.use('/api', detailsRouter)
app.use('/api', discoverRouter)
app.use('/api', filmRouter)
app.use('/api', genreRouter)
app.use('/api', imagesRouter)
app.use('/api', providerRouter)
app.use('/api', reviewRouter)
app.use('/api', similarRouter)
app.use('/api', trendingRouter)
app.use('/api', videoRouter)
app.use('/api/keywords', keywordsRouter)
app.use('/api/query', searchRouter)

export default app;

