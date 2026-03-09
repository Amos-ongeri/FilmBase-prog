import MainPage from './pages/home'
import { Route, Routes, useLocation } from "react-router-dom";
import TopBar from './components/topBar';
import ScrollToTop from './components/scroll_to_top.jsx'
import Anime from './pages/AnimePage.jsx';
import ShortFilm from './pages/shortFilmsPage.jsx';
import TvSeries from './pages/tvSeriesPage.jsx';
import Navigation1 from './components/sideNavigation1.jsx';
import Discover from './pages/discoverPage.jsx';
import Detail from './pages/detailsPage.jsx';
import Movies from './pages/moviesPage.jsx';

function App() {
  const location = useLocation()

  return ( 
    <div>
    <div className='flex w-full h-full bg-black'>
      {/* {!location.pathname.match('/details') && (
        <div className="w-16"></div>
      )} */}
      <ScrollToTop />
      <div className='w-full h-screen overflow-auto mask-l-from-99%'>
        <TopBar/>
        <div className="flex">
          {!location.pathname.match('/details') && (
            <Navigation1/>
          )}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/details/:tmdb_id/:media_type' element={<Detail/>}/>
            {/* <Route path="/movies" element={<Movies />} /> */}
            <Route path="/tv" element={<TvSeries />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/shorts" element={<ShortFilm />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
        </div>
      </div>
    </div>
    </div>

  )
}

export default App
