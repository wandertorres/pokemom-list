import { useContext, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./styles.scss";

export const Filters = () => {
    const {
        search,
        clearSearch,
        filterBy,
        types,
    } = useContext(PokemonContext);
    const [typeFilter, setTypeFilter] = useState<string>();

    return (
        <aside className = "filter">
            <h3>Filtrar por tipo</h3>
            <div className="filter__type">
                {types.map((type, index) => (
                    <span 
                        className = {type === typeFilter ? "--active" : ""} 
                        key = {index}
                        onClick = {() => {
                            setTypeFilter(type);
                            filterBy(type);
                        }}
                    >
                        {type}
                    </span>
                ))}
            </div>
            <h3>Filtrar favorito</h3>
            <div className="filter__favorite">
                <input type = "checkbox" />
            </div>

            <button onClick = {() => search("bul")}>Busque</button>
            <button onClick = {() => clearSearch()}>Limpar</button>    
        </aside>
    );
}