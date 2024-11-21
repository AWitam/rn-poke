import PokemonListView from '@/views/PokemonListView';
import { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import { ThemedText } from '@/components/ThemedText';
import { Animated, Button, StyleSheet, View, ViewStyle } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { ThemedView } from '@/components/ThemedView';
import { PokemonDetailsView } from '@/components/PokemonDetailsView';
import { usePokemonData } from '@/hooks/usePokemonData';
import { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function PokemonListScreen() {
  const color = useThemeColor({ light: Colors.light.background, dark: Colors.dark.card }, 'background');
  const tintColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const pokemon = usePokemonData({ pokemonId: selectedId });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: tintColor }}
        backgroundStyle={{
          backgroundColor: color,
        }}
        snapPoints={['70%', '100%']}
        onDismiss={() => {
          setSelectedId(null);
        }}>
        <BottomSheetScrollView style={styles.contentContainer}>
          {pokemon && <PokemonDetailsView pokemon={pokemon} colorName="background" />}
        </BottomSheetScrollView>
      </BottomSheetModal>
      <PokemonListView
        onPokemonPress={(id) => {
          setSelectedId(id);
          handlePresentModalPress();
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
