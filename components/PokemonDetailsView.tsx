import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Image } from 'expo-image';
import { capitalize } from '@/utils/capitalize';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface PokemonDetailsProps {
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark;
  pokemon: {
    name: string;
    image: string;
    description?: string;
    height: number;
    weight: number;
    gender?: string;
  };
}

export const PokemonDetailsView = ({
  colorName,
  pokemon: { name, image, description, height, weight, gender },
}: PokemonDetailsProps) => {
  const color = useThemeColor({ light: Colors.light[colorName], dark: Colors.dark[colorName] }, colorName);
  const styles = makeStyles(color);

  return (
    <ParallaxScrollView
      backgroundColor={color}
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
      backgroundColor: 'transparent',
    },
    image: {
      width: '100%',
      height: 200,
    },
    bodyContainer: {
      flex: 1,
      gap: 16,
      backgroundColor: tint,
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
