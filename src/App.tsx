import React, { useContext } from 'react';
import { PokemonContext, PokemonProvider } from './context/PokemonContext';

function App() {
  const pokemonContext = useContext(PokemonContext);

  return (
    <PokemonProvider>
      <div className="App">
        Hello Word!
      </div>
    </PokemonProvider>
  );
}

export default App;
