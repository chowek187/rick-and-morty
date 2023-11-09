import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'https://rickandmortyapi.com/api/character?page=1';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Info {
  count: number;
  next: string | null;
  prev: string | null;
}

interface Data {
  info: Info;
  results: Character[];
}

function App(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);

  async function fetchData(): Promise<void> {
    try {
      const response = await fetch(API_URL);
      const { results }: Data = await response.json();

      setCharacters(results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Rick and Morty</h1>
      <ul className="characters-container">
        {characters.map((character) => {
          return (
            <li key={character.id}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;