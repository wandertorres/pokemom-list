import React, { useContext } from 'react';
import { Card } from './components/Card';
import { PokemonContext, PokemonProvider } from './context/PokemonContext';

function App() {
  const { pokemons } = useContext(PokemonContext);

  return (
    <PokemonProvider>
      <div className="App">
        Hello Word!
        <Card />
      </div>
    </PokemonProvider>
  );
}

export default App;
