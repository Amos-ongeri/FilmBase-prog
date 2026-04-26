import MainPage from './pages/home'
import { Route, Routes, useLocation } from "react-router-dom";
import TopBar from './components/topBar';
import ScrollToTop from './components/scroll_to_top.jsx'
import TvSeries from './pages/tvSeriesPage.jsx';
import Navigation1 from './components/sideNavigation1.jsx';
import Discover from './pages/discoverPage.jsx';
import Detail from './pages/detailsPage.jsx';
import Movies from './pages/moviesPage.jsx';
import Index from './pages/details2';

function App() {
  // const location = useLocation();
  // const locations = () => {
  //   let locs = [];

  //   return locs.push(location.pathname)
  // }
  return (
    <>
    <div className='flex w-full h-screen bg-black'>
      <ScrollToTop />
      <Navigation1/>
      <div className='lg:w-[85%] w-full min-h-50 overflow-auto'>
        <TopBar/>
        <div className="flex lg:h-[94%]">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/details/:tmdb_id/:media_type' element={<Index/>}/>
            <Route path="/tv" element={<TvSeries />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
        </div>
      </div>
    </div>
    </>

  )
}

export default App
