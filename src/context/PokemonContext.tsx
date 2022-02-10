import { createContext, useContext, useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import axios from 'axios';

interface PokemonInterface {
    pokemons: Pokemon[];
    isFavorite: boolean;
    setFavorite: (pokemon: Pokemon) => void;
}

const defaultPokemonContext: PokemonInterface = {
    pokemons: [],
    isFavorite: false,
    setFavorite: () => null,
}

export const PokemonContext = createContext<PokemonInterface>(defaultPokemonContext);

export const PokemonProvider: React.FC = ({ children }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    function removeRepeated(pokemons: Pokemon[]): Pokemon[] {
        let listPokemons = pokemons.filter((pokemon, index, array) => 
            index === array.findIndex((filtered) => 
                filtered.national_number === pokemon.national_number
            )
        );

        listPokemons.map(pokemon => {
            pokemon.favorite = false;
        });

        return listPokemons;
    }

    function setFavorite(pokemon: Pokemon): void { }

    useEffect(() => {
        async function getPokemons() {
            let listPokemons: Pokemon[] = [];

            try {
                const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');
                const results = removeRepeated(response.data.results);

                results.forEach((pokemon: Pokemon) => {
                    listPokemons.push(pokemon);
                });

                setPokemons(listPokemons);
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
