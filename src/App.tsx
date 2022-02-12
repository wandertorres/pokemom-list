import { Cards } from './components/Cards';
import { PokemonProvider } from './context/PokemonContext';

function App() {
    return (
        <PokemonProvider>
            <div className="App">
              <Cards />
            </div>
        </PokemonProvider>
    );
}

export default App;
