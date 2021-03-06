import React, { createContext, SetStateAction, useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import axios from 'axios';

interface PokemonInterface {
    pokemons: Pokemon[],
    pokemonsToRender: Pokemon[];
    types: string[];
    filters: {type: string, favorite: boolean};
    setPokemonsToRender: React.Dispatch<SetStateAction<Pokemon[]>>
    setFilters: React.Dispatch<SetStateAction<{type: string, favorite: boolean}>>
}

const defaultPokemonContext: PokemonInterface = {
    pokemons: [],
    pokemonsToRender: [],
    types: [],
    filters: {type: "", favorite: false},
    setPokemonsToRender: () => null,
    setFilters: () => null,
}

export const PokemonContext = createContext<PokemonInterface>(defaultPokemonContext);

export const PokemonProvider: React.FC = ({ children }) => {
    const [pokemons, setPokemons] = useState(defaultPokemonContext.pokemons);
    const [pokemonsToRender, setPokemonsToRender] = useState(defaultPokemonContext.pokemonsToRender);
    const [types, setTypes] = useState(defaultPokemonContext.types);
    const [filters, setFilters] = useState(defaultPokemonContext.filters);

    const defineTypes = (pokemons: Pokemon[]): void => {
        let types: string[] = [];

        pokemons.map((pokemon) => {
            types.push(...pokemon.type);
            pokemon.favorite = false;
            return 0;
        });

        setTypes(Array.from(new Set(types)));
    }

    const removeEvolution = (pokemons: Pokemon[]): Pokemon[] => {
        return pokemons.filter((pokemon) =>
            pokemon.evolution === null
        );
    }

    useEffect(() => {
        const configure = (pokemons: Pokemon[]) => {
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
              alert(`N??o foi poss??vel carregar os pokemons. ${error}`);
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
                filters,
                setPokemonsToRender,
                setFilters,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
