import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { PokemonListResponse } from './usePokemons';

interface UsePokemonDataOptions {
  pokemonId: number | null;
}

//  maybe call api when id is not found in cache?
export const usePokemonData = ({ pokemonId }: UsePokemonDataOptions) => {
  const client = useQueryClient();

  if (!pokemonId) {
    return null;
  }

  const queryData = client.getQueryData<InfiniteData<PokemonListResponse>>(['pokemons']);
  const cachedPokemons = queryData?.pages.map((page) => page.results).flat();

  const pokemon = cachedPokemons?.find((pokemon) => pokemon.id === pokemonId);
  return pokemon;
};
