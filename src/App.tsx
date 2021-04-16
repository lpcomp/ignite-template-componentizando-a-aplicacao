import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  function changeMovie(selectedGenreId: number) {
    setSelectedGenreId(selectedGenreId);
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);      
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar changeMovie={changeMovie} />

      <Content movies={movies} selectedGenreId={selectedGenreId} />
    </div>
  )
}