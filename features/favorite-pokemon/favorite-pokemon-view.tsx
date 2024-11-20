import { PokemonDetailsView } from '@/components/PokemonDetailsView';
import { EmptyPokemonView } from '@/components/EmptyPokemon';
import { useFavoritePokemonContext } from '@/context/favorite-pokemon-context';

export const FavoritePokemonView = () => {
  const { favoritePokemon } = useFavoritePokemonContext();

  return favoritePokemon ? <PokemonDetailsView {...favoritePokemon} /> : <EmptyPokemonView />;
};
