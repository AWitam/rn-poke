import { ThemedText } from '@/components/ThemedText';
import { useObjectDetection } from '@/hooks/useObjectDetection';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useSkiaFrameProcessor } from 'react-native-vision-camera';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const { frameProcessor } = useObjectDetection();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (device == null) return <NoCameraDeviceError />;

  return <Camera frameProcessor={frameProcessor} style={StyleSheet.absoluteFill} device={device} isActive={true} />;
}

const NoCameraDeviceError = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ThemedText>No camera device found!</ThemedText>
  </View>
);
