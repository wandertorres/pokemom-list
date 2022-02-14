import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cards } from './components/Cards';
import { Filters } from './components/Filters';
import { Search } from './components/Search';
import { PokemonProvider } from './context/PokemonContext';

function App() {
    return (
        <PokemonProvider>
            <header>
                <div className = "header__container">
                    <div className = "header__title">
                        <h1>Pokedex</h1>
                    </div>
                    <div className = "header__exit">
                        <FontAwesomeIcon 
                            icon = {faSignOutAlt} 
                            size = "2x" 
                            cursor = "pointer"
                            color = "#FFF"          
                        />
                    </div>
                </div>
            </header>
            <Search />
            <main>
                <Filters />
                <Cards />
            </main>
        </PokemonProvider>
    );
}

export default App;
