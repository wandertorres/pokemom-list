import { useContext, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./styles.scss";

export const Filters = () => {
    const {
        search,
        filter,
        clearSearch,
        types,
    } = useContext(PokemonContext);
    const [filters, setFilters] = useState<{
        type: string,
        favorite: boolean,
    }>({
        type: "",
        favorite: false,
    });

    function changeFilter() {
        setFilters(filters);
        filter({type: filters.type, favorite: filters.favorite});
    }

    return (
        <aside className = "filter">
            <h3>Filtrar por tipo</h3>
            <div className="filter__type">
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

            <button onClick = {() => search("bul")}>Busque</button>
            <button onClick = {() => clearSearch()}>Limpar</button>    
        </aside>
    );
}