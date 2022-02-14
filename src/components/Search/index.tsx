import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { Pokemon } from "../../types/Pokemon";
import "./styles.scss";

export const Search = () => {
    const {pokemons, pokemonsToRender, setPokemonsToRender} = useContext(PokemonContext);
    const [searchValue, setSearchValue] = useState<string>("");

     const order = (value: string): void => {
        let listPokemons: Pokemon[] = [];

        if(value === "1") {
            listPokemons = pokemonsToRender.sort((a, b) => {
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            });
        } else if(value === "2") {
            listPokemons = pokemonsToRender.sort((a, b) => {
                return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
            });
        } else if(value === "3") {
            listPokemons = pokemonsToRender.sort((a, b) => {
                return a.national_number > b.national_number ? 1 : a.national_number < b.national_number ? -1 : 0;
            });
        } else {
            listPokemons = pokemonsToRender.sort((a, b) => {
                return a.national_number < b.national_number ? 1 : a.national_number > b.national_number ? -1 : 0;
            });
        }

        setPokemonsToRender([...listPokemons]);
    }

     const clearSearch = (): void => {
        setPokemonsToRender(pokemons);
        setSearchValue("");
    }

     const search = (input: string): void => {
        const listPokemons: Pokemon[] = pokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(input.toLowerCase()) ||
                pokemon.national_number.toLowerCase().includes(input.toLowerCase());
        });

        setPokemonsToRender(listPokemons);
    }

    const searchByValue = (): void => {
        if(searchValue === "") {
            alert("Digite algo para pesquisar!");
            return;
        }
        search(searchValue);
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
