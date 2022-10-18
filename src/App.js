import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { Home } from './routes/Home';
import { PokemonDetails } from './routes/PokemonDetails';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div data-testid="app">
      <Navigation />
      <Container>
      <BrowserRouter>
        <Routes>   
          <Route path='/' element={<Home pokemonList={pokemonList}/>}/>
          <Route path='/:name' element={<PokemonDetails pokemonList={pokemonList}/>}/>
        </Routes>
      </BrowserRouter>
      </Container>
    </div>
  );
}

export { App };
