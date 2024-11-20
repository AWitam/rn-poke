import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import mockPokemon from './mock-pokemon.json';
import { PokemonDetailsView } from '@/components/PokemonDetails';

interface PokemonData {
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export const FavoritePokemonView = () => {
  const [storedPokemon, setPokemon] = useAsyncStorage<PokemonData>('@favoritePokemon', mockPokemon);

  return (
    <PokemonDetailsView name={storedPokemon.name} imgUrl={storedPokemon.sprites.other['official-artwork'].front_default} />
  );
};
