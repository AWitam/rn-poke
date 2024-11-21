import { FlatList, StyleSheet, View } from 'react-native';
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
    height: number;
    weight: number;
    baseExperience: number;
    abilities?: {
      name: string;
      effect: string;
    }[];
  };
}

export const PokemonDetailsView = ({
  colorName,
  pokemon: { name, image, abilities, height, weight, baseExperience },
}: PokemonDetailsProps) => {
  const backgroundColor = useThemeColor({ light: Colors.light[colorName], dark: Colors.dark[colorName] }, colorName);
  const cardBackgroundColor = useThemeColor({ light: Colors.light.card, dark: Colors.dark.card }, 'card');

  return (
    <ParallaxScrollView
      backgroundColor={backgroundColor}
      headerImage={
        <ThemedView style={[styles.imageContainer]}>
          <Image source={image} contentFit="contain" style={styles.image} />
        </ThemedView>
      }>
      <ThemedView style={styles.bodyContainer}>
        <ThemedText type="title">{capitalize(name)}</ThemedText>
        <View style={[styles.detailsContainer, { backgroundColor: cardBackgroundColor }]}>
          <View style={styles.rowContainer}>
            <View style={styles.attributeContainer}>
              <ThemedText type="defaultSemiBold">Height: </ThemedText>
              <ThemedText>{height}</ThemedText>
            </View>
            <View style={styles.attributeContainer}>
              <ThemedText type="defaultSemiBold">Weight: </ThemedText>
              <ThemedText>{weight}</ThemedText>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.rowContainer}>
            <View style={styles.attributeContainer}>
              <ThemedText type="defaultSemiBold">Base experience: </ThemedText>
              <ThemedText>{baseExperience}</ThemedText>
            </View>
          </View>
        </View>
        <ThemedText type="subtitle">Abilities: </ThemedText>
        {abilities?.map((ability) => (
          <View key={ability.name} style={[styles.abilityContainer]}>
            <ThemedText type="defaultSemiBold">{ability.name}</ThemedText>
            <ThemedText>{ability.effect}</ThemedText>
          </View>
        ))}
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
    backgroundColor: 'transparent',
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
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  attributeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  abilityContainer: {
    marginVertical: 16,
    flex: 1,
    gap: 8,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
});
