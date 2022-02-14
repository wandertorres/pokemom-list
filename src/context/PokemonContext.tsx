import React, { createContext, SetStateAction, useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import axios from 'axios';

interface PokemonInterface {
    pokemons: Pokemon[],
    pokemonsToRender: Pokemon[];
    types: string[];
    setPokemonsToRender: React.Dispatch<SetStateAction<Pokemon[]>>
    filter: (filter: {type: string, favorite: boolean}) => void;
    setFavorite: (id: string) => void;
}

const defaultPokemonContext: PokemonInterface = {
    pokemons: [],
    pokemonsToRender: [],
    types: [],
    setPokemonsToRender: () => null,
    filter: () => null,
    setFavorite: () => null,
}

export const PokemonContext = createContext<PokemonInterface>(defaultPokemonContext);

export const PokemonProvider: React.FC = ({ children }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonsToRender, setPokemonsToRender] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<string[]>([]);

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

        listPokemons.map((pokemon) => {
            if(pokemon.national_number === id) {
                pokemon.favorite = !pokemon.favorite;
            }
            return 0;
        });

        setPokemonsToRender([...listPokemons]);
    }

    function defineTypes(pokemons: Pokemon[]): void{
        let types: string[] = [];

        pokemons.map((pokemon) => {
            types.push(...pokemon.type);
            pokemon.favorite = false;
            return 0;
        });

        setTypes(Array.from(new Set(types)));
    }

    function removeEvolution(pokemons: Pokemon[]): Pokemon[] {
        return pokemons.filter((pokemon) =>
            pokemon.evolution === null
        );
    }

    useEffect(() => {
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

        getPokemons();
    }, []);

    return(
        <PokemonContext.Provider 
            value={{
                pokemons,
                pokemonsToRender,
                types,
                setPokemonsToRender,
                filter,
                setFavorite
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
