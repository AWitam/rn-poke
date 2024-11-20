import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import mockPokemon from './mock-pokemon.json';
import { PokemonDetailsView } from '@/components/PokemonDetails';

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

  return <PokemonDetailsView {...storedPokemon} />;
};
