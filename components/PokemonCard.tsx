import { Pressable, View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Image } from 'expo-image';
import { IconSymbol } from './ui/IconSymbol';
import { capitalize } from '@/utils/capitalize';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface PokemonCardProps {
  id: number;
  image: string;
  name: string;
  description: string;
  isFavorite: boolean;
  onFavoritePress: () => void;
  onPress: () => void;
}

export const PokemonCard = ({ name, image, isFavorite, onPress, onFavoritePress }: PokemonCardProps) => {
  const color = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle">{capitalize(name)}</ThemedText>
        </View>
        <Pressable onPress={onFavoritePress}>
          <IconSymbol size={24} name={isFavorite ? 'heart.fill' : 'heart'} color={color} />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
