import { fetchPokemonList } from '@/api/pokemonApi';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export type PokemonListResponse = Awaited<ReturnType<typeof fetchPokemonList>>;

export const usePokemons = () => {
  return useInfiniteQuery<PokemonListResponse, Error, InfiniteData<PokemonListResponse>, readonly string[], number>({
    initialPageParam: 0,
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam = 10 }) => {
      return await fetchPokemonList({ limit: 10, offset: pageParam });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next : null;
    },
    staleTime: 1000 * 60 * 60 * 72, // 72 hours
  });
};
