import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";

export const Search = () => {
    const {
        order,
     } = useContext(PokemonContext);

    return(
        <div>
            <span>Ordenar por</span>
            <select defaultValue = "3" onChange = {(e) => order(e.target.value)}>
                <option value = "1">Nome (ascendente)</option>
                <option value = "2">Nome (descendente)</option>
                <option value = "3">Número (ascendente)</option>
                <option value = "4">Número (descendente)</option>
            </select>
        </div>
    );
}