import { Skia } from '@shopify/react-native-skia';
import { useFrameProcessor, useSkiaFrameProcessor } from 'react-native-vision-camera';
import { useResizePlugin } from 'vision-camera-resize-plugin';

import { VisionCameraProxy, Frame } from 'react-native-vision-camera';
import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectObjects', {});

interface Result {
  index: number;
  label: string;
  confidence: number;
}

export function detectObjects(frame: Frame) {
  'worklet';
  if (plugin == null) throw new Error('Failed to load Frame Processor Plugin "detectObjects"!');
  const result = plugin.call(frame);

  if (result == null) {
    return [];
  }

  return result as unknown as Result[];
}
