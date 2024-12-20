import { PokemonCard } from '@/components/PokemonCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFavoritePokemonContext } from '@/context/favorite-pokemon-context';
import { usePokemons } from '@/hooks/usePokemons';
import React from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';

interface PokemonsListViewProps {
  onPokemonPress: (id: number) => void;
}

export default function PokemonsListView({ onPokemonPress }: PokemonsListViewProps) {
  const { data, fetchNextPage, hasNextPage, isLoading } = usePokemons();
  const { favoritePokemon, setFavoritePokemon } = useFavoritePokemonContext();

  return (
    <ThemedView style={styles.container}>
      {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : (
        <FlatList
          data={data?.pages.map((page) => page.results).flat()}
          renderItem={({ item }) => {
            return (
              <PokemonCard
                name={item.name}
                id={item.id}
                image={item.image}
                description={''}
                isFavorite={favoritePokemon?.id === item.id}
                onFavoritePress={() => {
                  favoritePokemon?.id === item.id ? setFavoritePokemon(null) : setFavoritePokemon(item);
                }}
                onPress={() => onPokemonPress(item.id)}
              />
            );
          }}
          // onRefresh={() => {
          //   fetchNextPage()
          // }}
          keyExtractor={(item) => `${item.name}-${item.id}`}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
  },
});
