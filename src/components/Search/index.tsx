import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./styles.scss";

export const Search = () => {
    const {
        order,
        search,
        clearSearch
     } = useContext(PokemonContext);
     const [searchValue, setSearchValue] = useState<string>("");

     function searchByValue(): void {
        if(searchValue === "") {
            alert("Digite algo para pesquisar!");
            return;
        }
        search(searchValue);
        setSearchValue("");
     }

    return(
        <section className = "search-order">
            <div className = "search__container">
                <input className = "search__input"
                    value = {searchValue}
                    onChange = {(e) => setSearchValue(e.target.value)}
                    type = "text" 
                    placeholder = "Pesquisar"
                />
                <FontAwesomeIcon 
                    icon = {faSearch}
                    onClick = {searchByValue}
                />
                <button 
                    className = "search__clear"
                    type = "button"
                    onClick = {clearSearch}
                >
                    Limpar busca
                </button>
            </div>

            <div className = "order__container">
                <span>Ordenar por</span>
                <select defaultValue = "3" onChange = {(e) => order(e.target.value)}>
                    <option value = "1">Nome (ascendente)</option>
                    <option value = "2">Nome (descendente)</option>
                    <option value = "3">Número (ascendente)</option>
                    <option value = "4">Número (descendente)</option>
                </select>
            </div>
        </section>
    );
}