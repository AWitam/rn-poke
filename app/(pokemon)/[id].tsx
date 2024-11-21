import { PokemonDetailsView } from '@/components/PokemonDetailsView';
import { usePokemonData } from '@/hooks/usePokemonData';
import { useRouteId } from '@/hooks/useRouteId';

export default function PokemonDetailsScreen() {
  const pokemonId = useRouteId();
  const pokemon = usePokemonData({ pokemonId });

  return pokemon ? <PokemonDetailsView colorName={'background'} pokemon={pokemon} /> : null;
}
