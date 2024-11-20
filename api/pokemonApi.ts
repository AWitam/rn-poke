import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface FetchPokemonListOptions {
  limit: number;
  offset: number;
}

export async function fetchPokemonList({ limit, offset }: FetchPokemonListOptions) {
  const { data } = await axios.get<PokemonListResponse>(`${BASE_URL}/pokemon`, {
    params: {
      limit,
      offset,
    },
  });

  const nextOffset = parseInt(new URL(data.next).searchParams.get('offset') || '0', 10);

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      return fetchPokemonDetails(pokemon.url);
    }),
  );

  return {
    count: data.count,
    next: nextOffset,
    previous: data.previous,
    results: pokemonDetails,
  };
}

const fetchPokemonDetails = async (url: string) => {
  const { data } = await axios.get<PokemonRawResponse>(url);

  const pokemonData = {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    height: data.height,
    weight: data.weight,
    // TODO: Add description and gender
    description: 'TODO: Add description',
    gender: 'Unknown',
  } satisfies PokemonDetails;

  return pokemonData;
};
