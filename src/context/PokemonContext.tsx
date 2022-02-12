import { createContext, useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import axios from 'axios';

interface PokemonInterface {
    pokemons: Pokemon[],
    pokemonsToRender: Pokemon[];
    types: string[];
    search: (input: string) => void;
    clearSearch: () => void;
    filterBy: (type: string) => void
    setFavorite: (id: string) => void;
}

const defaultPokemonContext: PokemonInterface = {
    pokemons: [],
    pokemonsToRender: [],
    types: [],
    search: () => null,
    clearSearch: () => null,
    filterBy: () => null,
    setFavorite: () => null,
}

export const PokemonContext = createContext<PokemonInterface>(defaultPokemonContext);

export const PokemonProvider: React.FC = ({ children }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonsToRender, setPokemonsToRender] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<string[]>([]);

    function search(input: string): void {
        const listPokemons: Pokemon[] = pokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(input.toLowerCase()) ||
                pokemon.national_number.toLowerCase().includes(input.toLowerCase());
        });

        setPokemonsToRender([...listPokemons]);
    }

    function clearSearch(): void {
        setPokemonsToRender(pokemons);
    }

    function filterBy(type: string) {
        const listPokemons: Pokemon[] = pokemons.filter((pokemon) => 
            pokemon.type.includes(type)
        );

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

    function removeEvolution(pokemons: Pokemon[]): Pokemon[] {
        return pokemons.filter((pokemon) =>
            pokemon.evolution === null
        );
    }

    function setStates(pokemons: Pokemon[]) {
        let types: string[] = [];
        
        pokemons.map((pokemon) => {
            types.push(...pokemon.type)
        });

        setPokemons(pokemons);
        setPokemonsToRender(pokemons);
        setTypes(Array.from(new Set(types)));
    }

    async function getPokemons(): Promise<void> {
        try {
            const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');
            const listPokemons: Pokemon[] = removeEvolution(response.data.results);

            setStates(listPokemons);
        } catch (error) {
          console.log(`Erro ao buscar lista de pokemons (${error})`)
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
                filterBy,
                setFavorite
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
