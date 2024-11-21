import axios from 'axios';
import { Ability, AbilityRawResponse, PokemonDetails, PokemonListResponse, PokemonRawResponse } from './types';
import {  mapRawAbilityToAbility } from './mappers';

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
  try {
    const { data } = await axios.get<PokemonRawResponse>(url);

    const abilities = await Promise.all(
      data.abilities.map(async (ability) => fetchAbilititesDetails(ability.ability.url)),
    );

    const pokemonData = {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      height: data.height,
      weight: data.weight,
      baseExperience: data.base_experience,
      abilities,
    } satisfies PokemonDetails;

    return pokemonData;
  } catch (error) {
    console.error('Failed to fetch pokemon details', error);
    throw error;
  }
};

const fetchAbilititesDetails = async (url: string) => {
  try {
    const { data } = await axios.get<AbilityRawResponse>(url);
    return mapRawAbilityToAbility(data);
  } catch (error) {
    console.error('Failed to fetch ability details', error);
    throw error;   
  }
};
