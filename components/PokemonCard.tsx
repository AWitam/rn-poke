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
  onPress: () => void;
  onFavoritePress: () => void;
}

import React, { forwardRef } from 'react';
import { useRouter } from 'expo-router';

export const PokemonCard = forwardRef<View, PokemonCardProps>(
  ({ id, name, image, isFavorite, onFavoritePress, onPress }, ref) => {
    const cardColor = useThemeColor({ light: Colors.light.card, dark: Colors.dark.card }, 'card');
    const iconColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');
    const router = useRouter();

    return (
      <Pressable ref={ref} onPress={onPress}>
        <View style={{ ...styles.container, backgroundColor: cardColor }}>
          <Image source={image} style={styles.image} />
          <View style={{ flex: 1 }}>
            <ThemedText type="subtitle">{capitalize(name)}</ThemedText>
          </View>
          <Pressable onPress={onFavoritePress}>
            <IconSymbol size={24} name={isFavorite ? 'heart.fill' : 'heart'} color={iconColor} />
          </Pressable>
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
