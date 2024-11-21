interface PokemonRawResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonRawResult[];
}

export interface PokemonRawResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
}

export interface AbilityRawResponse {
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
}

export interface Ability {
  name: string;
  effect: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
  baseExperience: number;
  abilities?: Ability[];
}
