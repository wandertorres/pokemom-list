import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./styles.scss";

export function Cards() {
    const {pokemonsToRender, setPokemonsToRender} = useContext(PokemonContext);

    const setFavorite = (id: string): void => {
        const listPokemons = pokemonsToRender;

        listPokemons.forEach((pokemon) => {
            if(pokemon.national_number === id) {
                pokemon.favorite = !pokemon.favorite;
            }
        });

        setPokemonsToRender([...listPokemons]);
    }

    return(
        <>
            {pokemonsToRender.length > 0 ? (
                <section className="card">            
                    {pokemonsToRender.map((pokemon, index) => 
                        <div className = "card__container" key = { index }>
                            <div className = "card__img">
                                <div className = "card__icon">
                                    <FontAwesomeIcon 
                                        className = {pokemon.favorite ? "--favorite" : ""}
                                        icon = {faHeart} 
                                        color = "red" 
                                        cursor = "pointer" 
                                        onClick = {() => setFavorite(pokemon.national_number)}
                                    />
                                </div>
                                <img src = {pokemon.sprites.large} alt = {pokemon.name} />
                            </div>
                            <div className = "card__info">
                                <span>Nº {pokemon.national_number}</span>
                                <h3>{pokemon.name}</h3>
                                <div className="card__type">
                                    {pokemon.type.map((type, index) => (
                                        <span className = {type} key = {index}>{type}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            ) : 
                <section>
                    <h3 className="card__empty">Não há pokemons que correspondam à sua busca...</h3>
                </section>
            }
        </>
    );
}
