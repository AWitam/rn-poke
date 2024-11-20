import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol, IconSymbolName } from './ui/IconSymbol';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button, Touchable, TouchableHighlight } from 'react-native';

interface HeaderIconButtonProps {
  name: IconSymbolName;
  onPress: () => void;
}
export const HeaderIconButton = ({ name, onPress, ...props }: HeaderIconButtonProps) => {
  const color = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');

  return (
    <TouchableHighlight  onPress={onPress} {...props}>
      <IconSymbol size={24} name={name} color={color} />
    </TouchableHighlight>
  );
};
