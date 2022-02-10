import { useContext, useState } from "react"
import { PokemonContext } from "../../context/PokemonContext"
import { Pokemon } from "../../types/Pokemon";

export const Card = () => {
    const { 
        pokemons,
        favorites,
        isFavorite,
        search,
    } = useContext(PokemonContext);

    return(
        <section>   
            <button onClick={() => search("2")}>Busque</button>             
            {pokemons.map((pokemon, index) => 
                <div key={index}>
                    <img src={pokemon.sprites.large} />
                    <h4>{pokemon.national_number}</h4>
                    <h2>{pokemon.name}</h2>
                </div>
            )}
        </section>
    );
}
