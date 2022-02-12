import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import './style.scss';

export const Cards = () => {
    const { 
        pokemonsToRender,
        search,
        clearSearch,
        setFavorite,
    } = useContext(PokemonContext);

    return(
        <>
        <button onClick = {() => search("bul")}>Busque</button>
        <button onClick = {() => clearSearch()}>Limpar</button>
        <section className="container">                
            { pokemonsToRender.map((pokemon, index) => 
                <div className = "container__card" key = { index }>
                    <div className = "card__img">
                        <div className = "card__icon">
                            <FontAwesomeIcon 
                                className = {pokemon.favorite ? "--favorite" : ""}
                                icon = {faHeart} 
                                color = "red" 
                                cursor = "pointer" 
                                onClick = {(    ) => setFavorite(pokemon.national_number)}
                            />
                        </div>
                        <img src = {pokemon.sprites.large} alt = {pokemon.name} />
                    </div>
                    <div className = "card__info">
                        <span>Nº {pokemon.national_number}</span>
                        <h3>{pokemon.name}</h3>
                        <div className="info__type">
                            {pokemon.type.map((type, index) => (
                                <span key = {index}>{type}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ) }
        </section>
        </>
    );
}
