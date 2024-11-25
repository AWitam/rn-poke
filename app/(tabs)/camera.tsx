import { Label } from '@/components/Label';
import { ThemedText } from '@/components/ThemedText';
import { detectObjects } from '@/hooks/useObjectDetection';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { useRunOnJS } from 'react-native-worklets-core';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const labelRef = useRef<string>('nothing detected');

  useEffect(() => {

    device?.formats.forEach((format) => {
      console.log('Format:', format);
    } );
  }, []);

  const updateLabel = useRunOnJS((results) => {
    labelRef.current = results;
  }, []);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      const objects = detectObjects(frame);

      const prediction = objects.find((object) => object.confidence > 0.5)?.label ?? 'Nothing detected';

      console.log('Detected:', prediction);

      updateLabel(prediction);
    },
    [],
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} frameProcessor={frameProcessor} fps={30} device={device} isActive={true} />

      <Text style={{ color: 'white', fontSize: 24, padding: 20, backgroundColor: 'rgba(0,0,0,0.7)' }}>
        {labelRef.current}
      </Text>
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
});

const NoCameraDeviceError = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ThemedText>No camera device found!</ThemedText>
  </View>
);
