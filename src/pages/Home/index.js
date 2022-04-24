import React, { useState, useEffect } from "react";
import {goToPokedex, goToPokemonDetail} from "../../routes/Coordinator"
import { useNavigate } from "react-router-dom";
import { Button, CardContainer, CardFoto, HeaderContainer, FormContainer} from "./styled";
import axios from "axios";


export const Home = () => {
    const navigate = useNavigate()

    const [pokemons, setPokemons] = useState()

  useEffect(() => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((res) => {
          list.push(res.data);
          if (list.length === 20) {
            setPokemons(list)
          }
        })
        .catch((err) => console.log(err.message))
    }
  }, [])

  const details =
    pokemons &&
    pokemons.map((pokemon) => {
      return (
        <CardContainer key={pokemon.id}>
          <CardFoto>
            <img src={pokemon.sprites.front_default} alt="" />
          </CardFoto>
          <h2>{pokemon.name}</h2>
          <Button >Adicionar a Pokédex</Button>
          <Button onClick={() => goToPokemonDetail(navigate, pokemon.name)}>Ver Detalhes</Button>
        </CardContainer>
      );
    });


    return (<>
     
    <div>
      <HeaderContainer>
        <Button onClick={() => goToPokedex(navigate)}>Ir para pokedex</Button>
        <h2> Lista pokemons </h2>
      </HeaderContainer>
      <FormContainer>{details}</FormContainer>
    </div>
    
    
    </>)

}