import { Label } from '@/components/Label';
import { ThemedText } from '@/components/ThemedText';
import { detectObjects } from '@/hooks/useObjectDetection';
import { useAppState } from '@react-native-community/hooks';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useRunOnJS,  Worklets } from 'react-native-worklets-core';

export default function CameraScreen() {
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const label = useSharedValue('Nothing detected');


  const updateLabel = Worklets.createRunOnJS((prediction: string) => {
    label.set(prediction);
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const objects = detectObjects(frame);

    const prediction = objects.find((object) => object.confidence > 0.5)?.label ?? 'Nothing detected';

    console.log('Detected:', prediction);

    updateLabel(prediction);
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (device == null) return <NoCameraDeviceError />;

  const animatedText = useAnimatedStyle

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} frameProcessor={frameProcessor} fps={30} device={device} isActive={isActive} />

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
