import { Fragment, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContext';
import { SearchContext } from './contexts/SearchContext';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';

import './App.css';


function App() {
  let [search, setSearch] = useState('');
  let [message, setMessage] = useState('Search for Music!!');
  let [data, setData] = useState([]);
  let searchInput = useRef('')

  useEffect(() => {
    const fetchData = async () => {
      if (!search) return
      document.title = `${search} Music`;
      const response = await fetch(`https://itunes.apple.com/search?term=${search}`);
      const resData = await response.json();
      if (resData.results.length) {
        setData(resData.results)
      } else {
        setData([]);
        setMessage("Nothing found for that artist")
      }

      console.log(resData)

    }
    fetchData();
  }, [search]);

  const handleSearch = searchTerm => {

  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <SearchContext.Provider value={
                {
                  term: searchInput,
                  handleSearch: setSearch
                }
              }>
                <SearchBar />
              </SearchContext.Provider>


              <DataContext.Provider value={
                {
                  data
                }
              }>
                <Gallery />
              </DataContext.Provider>
            </>
          } />
          <Route path='/album/:id' element={ <AlbumView/>} />
          <Routes path='/artist/:id' element={ <AlbumView/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
