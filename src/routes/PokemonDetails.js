import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { PokemonCard } from '../components/PokemonCard';
import {useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function PokemonDetails(props) {

    const [pokemon, setPokemon] = useState(null);

    const params = useParams();

    useEffect(() => {

        fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
          .then((res) => res.json())
          .then((data) => {
            setPokemon(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [params.name]);

      console.log(pokemon);

    if (!pokemon) {
        return <>loading...</>;
    }
    return (
        <div data-testid="app">
                <Card style={{ width: '18rem' }} className='mx-auto'>
      <Card.Img
        width='286'
        height='286'
        bg='dark'
        variant='top'
        src={pokemon?.sprites.front_default}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text as='div'>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          Abilities:
          <ul>
            {pokemon?.abilities.map((ability) => (
              <li key={ability.ability.name}>
                <span key={ability.ability.name}>{ability.ability.name}</span>
              </li>
            ))}
          </ul>
          Types:
          <ul>
            {pokemon?.types.map((type) => (
              <li key={type.type.name}>
                <span key={type.type.name}>{type.type.name}</span>
              </li>
            ))}
          </ul>
          Stats:
          <ul>
            {pokemon?.stats.map((stat) => (
              <li key={stat.stat.name}>
                <span key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </Card.Text>
    
      </Card.Body>
    </Card>
        </div>
    )
}

export { PokemonDetails };
