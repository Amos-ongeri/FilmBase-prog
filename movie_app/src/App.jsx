import MainPage from './pages/home'
import { Route, Routes} from "react-router-dom";
import TopBar from './components/topBar';
import ScrollToTop from './components/scroll_to_top.jsx'
import TvSeries from './pages/tvSeriesPage.jsx';
import Navigation1 from './components/sideNavigation1.jsx';
import Discover from './pages/discoverv1.0.jsx';
import Movies from './pages/moviesPage.jsx';
import Details from './pages/detailsv1.0';
import WatchList from './pages/watchList';
import { useState } from 'react';

function App() {
  // const location = useLocation();
  // const locations = () => {
  //   let locs = [];

  //   return locs.push(location.pathname)
  // }
  const [isopen, setIsOpen] = useState(false);
  return (
    <>
    <div className='w-full h-screen bg-black'>
      <ScrollToTop />
      <Navigation1 isOpenSidebar={isopen} toggle={() => setIsOpen(prev => !prev)}/>
      <div className=' w-full min-h-50'>
        <TopBar toggleSidebar={() => setIsOpen(prev => !prev)}/>
        <div className="lg:min-h-[91%]">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/details/:tmdb_id/:media_type' element={<Details/>}/>
            <Route path="/tv" element={<TvSeries />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/discover" element={<Discover />} />
            <Route path='/watch-list' element={<WatchList />} />
          </Routes>
        </div>
      </div>
    </div>
    </>

  )
}

export default App
