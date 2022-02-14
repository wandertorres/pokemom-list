import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { Pokemon } from "../../types/Pokemon";
import "./styles.scss";

export function Filters() {
    const {pokemons, types, filters, setPokemonsToRender, setFilters} = useContext(PokemonContext);
    
    const filter = (filter: {type: string, favorite: boolean}): void => {
        let listPokemons: Pokemon[] = pokemons;
        
        if(filter.favorite)
            listPokemons = listPokemons.filter(pokemon => pokemon.favorite);
        
        if(filter.type !== "")
            listPokemons = listPokemons.filter(pokemon => pokemon.type.includes(filter.type))

        setPokemonsToRender(listPokemons);
    }

    const changeFilter = (): void => {
        setFilters(filters);
        filter({type: filters.type, favorite: filters.favorite});
    }

    return (
        <aside className = "filter">
            <h3>Filtrar por tipo</h3>
            <div className = "filter__type">
                {types.map((type, index) => (
                    <span 
                        className = {type === filters.type ? "--active" : ""} 
                        key = {index}
                        onClick = {() => {
                            type === filters.type ? filters.type = "" : filters.type = type;
                            changeFilter();
                        }}
                    >
                        {type}
                    </span>
                ))}
            </div>
            <h3>Filtrar favorito</h3>
            <div className = "filter__favorite">
                <label className = "filter__switch">
                    <input type = "checkbox" checked={filters.favorite} />
                    <span onClick = {() => {
                        filters.favorite = !filters.favorite;
                        changeFilter();
                    }}></span>
                </label>
            </div>   
        </aside>
    );
}
