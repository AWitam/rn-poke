import { PokemonCard } from '@/components/PokemonCard';
import { PokemonDetailsView } from '@/components/PokemonDetailsView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams();

  console.log('id', id);

  return <PokemonDetailsView name={'elo'} image={''} height={0} weight={0} />;
}
