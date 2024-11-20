import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import * as React from 'react';
import { PropsWithChildren } from 'react';

interface PokemonData {
  id: number;
  name: string;
  image: string;
  description?: string;
  height: number;
  weight: number;
  gender?: string;
}

interface FavoritePokemonContext {
  favoritePokemon: PokemonData | null;
  setFavoritePokemon: (pokemon: PokemonData | null) => void;
}

const FavoritePokemonContext = React.createContext<FavoritePokemonContext | undefined>(undefined);

function FavoritePokemonProvider({ children }: PropsWithChildren) {
  const [favoritePokemon, setFavoritePokemon] = useAsyncStorage<PokemonData | null>('@favoritePokemon', null);

  return (
    <FavoritePokemonContext.Provider value={{ favoritePokemon, setFavoritePokemon }}>
      {children}
    </FavoritePokemonContext.Provider>
  );
}

function useFavoritePokemonContext() {
  const context = React.useContext(FavoritePokemonContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { FavoritePokemonProvider, useFavoritePokemonContext };
