import PokemonListView from '@/views/PokemonListView';
import { ThemedView } from '@/components/ThemedView';
import { usePokemonData } from '@/hooks/usePokemonData';
import { ThemedBottomSheet } from '@/components/ThemedBottomSheet';
import { useCallback, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PokemonDetailsView } from '@/components/PokemonDetailsView';

export default function PokemonListScreen() {
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const pokemon = usePokemonData({ pokemonId: selectedId });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedBottomSheet ref={bottomSheetModalRef}>{pokemon && <PokemonDetailsView {...pokemon} />}</ThemedBottomSheet>
      <PokemonListView
        onPokemonPress={(id) => {
          setSelectedId(id);
          handlePresentModalPress();
        }}
      />
    </ThemedView>
  );
}
