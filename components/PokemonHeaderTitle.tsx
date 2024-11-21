import { usePokemonData } from '@/hooks/usePokemonData';
import { ThemedText } from './ThemedText';
import { capitalize } from '@/utils/capitalize';
import { useRouteId } from '@/hooks/useRouteId';

export const PokemonHeaderTitle = ({}) => {
  const pokemonId = useRouteId();
  const pokemon = usePokemonData({ pokemonId });

  return pokemon ? <ThemedText>{capitalize(pokemon.name)}</ThemedText> : null;
};
