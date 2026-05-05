import MainPage from './pages/home'
import { Route, Routes} from "react-router-dom";
import TopBar from './components/topBar';
import ScrollToTop from './components/scroll_to_top.jsx'
import TvSeries from './pages/tvSeriesPage.jsx';
import Navigation from './components/sideNavigation.jsx';
import Discover from './pages/discoverv1.0.jsx';
import Movies from './pages/moviesPage.jsx';
import Details from './pages/detailsv1.0';
import WatchList from './pages/watchList';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollToTopButton } from './hooks/scrollToTop';

function App() {
  const show = useScrollToTopButton()

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }
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
      <Navigation isOpenSidebar={isopen} toggle={() => setIsOpen(prev => !prev)}/>
      <div className=' w-full min-h-50 overflow-y-auto'>
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
        <div onClick={scrollTop} className={`fixed bottom-5 right-5 z-30 glass p-4 rounded-full transition-all duration-300 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}><ArrowUp /></div>
      </div>
    </div>
    </>

  )
}

export default App
