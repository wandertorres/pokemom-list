import { Cards } from './components/Cards';
import { Filters } from './components/Filters';
import { Search } from './components/Search';
import { PokemonProvider } from './context/PokemonContext';

function App() {
    return (
        <PokemonProvider>
            <header>
                <Search />
            </header>
            <main>
                <Filters />
                <Cards />
            </main>
        </PokemonProvider>
    );
}

export default App;
