import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HeaderIconButton } from '@/components/HeaderIconButton';
import { FavoritePokemonProvider, useFavoritePokemonContext } from '@/context/favorite-pokemon-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { favoritePokemon, setFavoritePokemon } = useFavoritePokemonContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerRight: ({ tintColor, ...props }) =>
            favoritePokemon && (
              <HeaderIconButton
                name={'heart.fill'}
                onPress={() => {
                  setFavoritePokemon(favoritePokemon ?? null);
                }}
                {...props}
              />
            ),
          title: 'Favorite',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          headerShown: true,
          title: 'Pokemons',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          headerShown: true,
          title: 'Camera',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
