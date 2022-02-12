import { Cards } from './components/Cards';
import { Filters } from './components/Filters';
import { PokemonProvider } from './context/PokemonContext';

function App() {
    return (
        <PokemonProvider>
            <main>
                <Filters />
                <Cards />
            </main>
        </PokemonProvider>
    );
}

export default App;
