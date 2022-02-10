import { useContext } from "react"
import { PokemonContext } from "../../context/PokemonContext"

export const Card = () => {
    const { pokemons } = useContext(PokemonContext);

    return(
        <>
            {pokemons.map((pokemon, index) => (
                <div key={index}>
                    <img src={pokemon.sprites.large} />
                    <h5>{pokemon.name}</h5>
                </div>
            ))}
        </>
    );
}