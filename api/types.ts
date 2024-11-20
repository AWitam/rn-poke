interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

interface PokemonRawResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
  description?: string;
  gender?: string;
}
