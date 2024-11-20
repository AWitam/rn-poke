import { Platform, StyleSheet, View } from 'react-native';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Image } from 'expo-image';
import { capitalize } from '@/utils/capitalize';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface PokemonDetailsProps {
  name: string;
  image: string;
  description?: string;
  height: number;
  weight: number;
  gender?: string;
}

export const PokemonDetailsView = ({ name, image, description, height, weight, gender }: PokemonDetailsProps) => {
  const color = useThemeColor({ light: Colors.light.card, dark: Colors.dark.card }, 'tint');
  const styles = makeStyles(color);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ThemedView style={styles.imageContainer}>
          <Image source={image} contentFit="contain" style={styles.image} />
        </ThemedView>
      }>
      <ThemedView style={styles.bodyContainer}>
        <ThemedText type="title">{capitalize(name)}</ThemedText>
        <ThemedText type="subtitle">{description}</ThemedText>
        <View style={styles.detailsContainer}>
          <View style={styles.attributeContainer}>
            <ThemedText type="defaultSemiBold">Height</ThemedText>
            <ThemedText>{height}</ThemedText>
          </View>
          <View style={styles.attributeContainer}>
            <ThemedText type="defaultSemiBold">Weight</ThemedText>
            <ThemedText>{weight}</ThemedText>
          </View>
          <View style={styles.attributeContainer}>
            <ThemedText type="defaultSemiBold">Gender</ThemedText>
            <ThemedText>{gender}</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const makeStyles = (tint: string) =>
  StyleSheet.create({
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
    bodyContainer: {
      flex: 1,
      gap: 16,
    },
    detailsContainer: {
      marginVertical: 16,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 8,
      backgroundColor: tint,
    },
    attributeContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  });
