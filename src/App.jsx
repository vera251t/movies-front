import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { Home, Directors, Actors, MovieDetail } from './pages'
import { LoadingScreen, NavBar, Notification } from './components'
import { useEffect, useState } from 'react'
import { getGenresThunk } from './store/slices/genres.slice'
import { useDispatch, useSelector } from 'react-redux'
import { getActorsThunk } from './store/slices/actors.slice'
import { getDirectorsThunk } from './store/slices/directors.slice'
import { getMoviesThunk } from './store/slices/movies.slice'
import MovieForm from './pages/MovieForm'

function App() {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.isLoading);

  useEffect(() => {
    dispatch(getGenresThunk());
    dispatch(getActorsThunk());
    dispatch(getDirectorsThunk());
    dispatch(getMoviesThunk());
  }, [])

  return (
    <HashRouter>
      <NavBar />
      <Notification />
      { isLoading && <LoadingScreen /> }
      <Container className='my-5'>
      <Button variant="primary" onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies/add" element={<MovieForm />} />
          <Route path="/movies/update/:id" element={<MovieForm />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
