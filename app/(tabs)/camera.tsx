import { Label } from '@/components/Label';
import { ThemedText } from '@/components/ThemedText';
import { useObjectDetection } from '@/hooks/useObjectDetection';
import { useAppState } from '@react-native-community/hooks';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  const { frameProcessor, label } = useObjectDetection();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        frameProcessor={frameProcessor}
        fps={30}
        device={device}
        isActive={isActive}
        enableZoomGesture={true}
        resizeMode={'contain'}
      />

      <Label sharedValue={label} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  text: {
    position: 'absolute',
    top: 48,
    padding: 4,
    marginHorizontal: 20,
    backgroundColor: '#000000CC',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
});

const NoCameraDeviceError = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ThemedText>No camera device found!</ThemedText>
  </View>
);
