import MainPage from './pages/home'
import { Route, Routes } from "react-router-dom";
import TopBar from './components/topBar';
import ScrollToTop from './components/scroll_to_top.jsx'
import TvSeries from './pages/tvSeriesPage.jsx';
import Navigation1 from './components/sideNavigation1.jsx';
import Discover from './pages/discoverPage.jsx';
import Detail from './pages/detailsPage.jsx';
import Movies from './pages/moviesPage.jsx';

function App() {
  return (
    <>
    <div className='flex w-full h-screen bg-black'>
      <ScrollToTop />
      <Navigation1/>
      <div className='w-[85%] h-screen overflow-auto'>
        <TopBar/>
        <div className="flex h-[89%] px-5 md:p-0 lg:p-0">
          <Routes>
            <Route path="/home" element={<MainPage />} />
            <Route path='/details/:tmdb_id/:media_type' element={<Detail/>}/>
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
