import { createContext, useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import axios from 'axios';

export interface PokemonInterface {
    pokemons: Pokemon[];
    isFavorite: boolean;
    setFavorite: (pokemon: Pokemon) => void;
}

export const PokemonContext = createContext<PokemonInterface| null>(null);

export const PokemonProvider: React.FC = ({ children }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    function setFavorite(pokemon: Pokemon): void { }

    useEffect(() => {
        async function getPokemons() {
            let list: Pokemon[] = [];

            try {
                const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');
                const results = response.data.results;

                results.forEach((pokemon: Pokemon) => {
                    list.push(pokemon);
                });

                setPokemons(list);
            } catch (error) {
                console.log(`Erro ao buscar lista de pokemons (${error})`)
            }
        }

        getPokemons();
    }, []);

    return(
        <PokemonContext.Provider 
            value={{
                pokemons,
                isFavorite,
                setFavorite
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
