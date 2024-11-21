import { ForwardedRef, forwardRef, PropsWithChildren, PropsWithRef, useCallback, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetModalProps, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ThemedBottomSheet = forwardRef(
  (props: PropsWithChildren<BottomSheetModalProps>, ref: ForwardedRef<BottomSheetModal>) => {
    const color = useThemeColor({ light: Colors.light.background, dark: Colors.dark.card }, 'background');
    const tintColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');

    const insets = useSafeAreaInsets();

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: tintColor }}
        backgroundStyle={{
          backgroundColor: color,
        }}
        style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}
        snapPoints={['70%', '100%']}
        {...props}>
        <BottomSheetScrollView style={styles.contentContainer}>{props.children}</BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
