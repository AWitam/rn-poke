import { StyleSheet } from 'react-native';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Image } from 'expo-image';

interface PokemonDetailsProps {
  name: string;
  imgUrl: string;
}

export const PokemonDetailsView = ({ name, imgUrl }: PokemonDetailsProps) => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ThemedView style={styles.imageContainer}>
          <Image source={imgUrl} contentFit="contain" style={styles.image} />
        </ThemedView>
      }>
      <ThemedView style={styles.detialsContainer}>
        <ThemedText>{name}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 200,
  },
  detialsContainer: {
    flex: 1,
  },
});
