import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import mockPokemon from './mock-pokemon.json';
import { PokemonDetailsView } from '@/components/PokemonDetailsView';
import { EmptyPokemonView } from '@/components/EmptyPokemon';


interface PokemonData {
  id: number;
  name: string;
  image: string;
  description: string;
  height: number;
  weight: number;
  gender: string;
}

export const FavoritePokemonView = () => {
  const [storedPokemon, _setPokemon] = useAsyncStorage<PokemonData>('@favoritePokemon', mockPokemon);

  return storedPokemon ? <PokemonDetailsView {...storedPokemon} /> : <EmptyPokemonView />;
};
