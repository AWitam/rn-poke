import { StyleSheet } from 'react-native';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Image } from 'expo-image';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const image = require('@/assets/images/pokeball.png');

export const EmptyPokemonView = () => {
  const color = useThemeColor({ light: Colors.light.backround, dark: Colors.dark.background }, 'background');
  return (
    <ParallaxScrollView
      backgroundColor={color}
      headerImage={
        <ThemedView style={styles.imageContainer}>
          <Image source={image} contentFit="contain" style={styles.image} />
        </ThemedView>
      }>
      <ThemedView style={styles.bodyContainer}>
        <ThemedText type="title" style={styles.text}>
          {"You don't have favorite pokemon yet!"}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 150,
  },
  bodyContainer: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
