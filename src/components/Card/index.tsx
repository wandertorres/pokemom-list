import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";

export const Card = () => {
    const { 
        favorites,
        pokemonsTemp,
        isFavorite,
        search,
        clearSearch,
    } = useContext(PokemonContext);

    return(
        <section>   
            <button onClick={() => search("2")}>Busque</button>
            <button onClick={() => clearSearch()}>Limpar</button>             
            {pokemonsTemp.map((pokemon, index) => 
                <div key={index}>
                    <img src={pokemon.sprites.large} alt={pokemon.name} />
                    <span>{pokemon.national_number}</span>
                    <h2>{pokemon.name}</h2>
                    {pokemon.type.map((type, index) => (
                        <span key={index}>{type}</span>
                    ))}
                </div>
            )}
        </section>
    );
}
