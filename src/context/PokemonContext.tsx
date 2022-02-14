import React, { createContext, useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import axios from 'axios';

interface PokemonInterface {
    pokemons: Pokemon[],
    pokemonsToRender: Pokemon[];
    types: string[];
    search: (input: string) => void;
    clearSearch: () => void;
    order: (order: string) => void;
    filter: (filter: {type: string, favorite: boolean}) => void;
    setFavorite: (id: string) => void;
}

const defaultPokemonContext: PokemonInterface = {
    pokemons: [],
    pokemonsToRender: [],
    types: [],
    search: () => null,
    clearSearch: () => null,
    order: () => null,
    filter: () => null,
    setFavorite: () => null,
}

export const PokemonContext = createContext<PokemonInterface>(defaultPokemonContext);

export const PokemonProvider: React.FC = ({ children }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonsToRender, setPokemonsToRender] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<string[]>([]);

    function search(input: string): void {
        const listPokemons: Pokemon[] = pokemonsToRender.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(input.toLowerCase()) ||
                pokemon.national_number.toLowerCase().includes(input.toLowerCase());
        });

        setPokemonsToRender([...listPokemons]);
    }

    function clearSearch(): void {
        setPokemonsToRender(pokemons);
    }

    function order(value: string) {
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

    function filter(filter: {type: string, favorite: boolean}): void {
        console.log(filter)
        let listPokemons: Pokemon[] = pokemons;
        
        if(filter.favorite)
            listPokemons = listPokemons.filter(pokemon => pokemon.favorite);
        
        if(filter.type !== "")
            listPokemons = listPokemons.filter(pokemon => pokemon.type.includes(filter.type))

        setPokemonsToRender(listPokemons);
    }

    function setFavorite(id: string): void {
        const listPokemons = pokemonsToRender;

        listPokemons.map(pokemon => {
            if(pokemon.national_number === id) {
                pokemon.favorite = !pokemon.favorite;
            }
        });

        setPokemonsToRender([...listPokemons]);
    }

    function defineTypes(pokemons: Pokemon[]): void{
        let types: string[] = [];

        pokemons.map((pokemon) => {
            types.push(...pokemon.type);
            pokemon.favorite = false;
        });

        setTypes(Array.from(new Set(types)));
    }

    function removeEvolution(pokemons: Pokemon[]): Pokemon[] {
        return pokemons.filter((pokemon) =>
            pokemon.evolution === null
        );
    }

    function configure(pokemons: Pokemon[]) {
        const listPokemons = removeEvolution(pokemons);

        defineTypes(listPokemons);
        setPokemons(listPokemons);
        setPokemonsToRender(listPokemons);
    }

    async function getPokemons(): Promise<void> {
        try {
            const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');
            const results: Pokemon[] = response.data.results;

            configure(results);
        } catch (error) {
          alert(`Não foi possível carregar os pokemons. ${error}`);
        }
    }

    useEffect(() => {
        getPokemons();
    }, []);

    return(
        <PokemonContext.Provider 
            value={{
                pokemons,
                pokemonsToRender,
                types,
                search,
                clearSearch,
                order,
                filter,
                setFavorite
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
