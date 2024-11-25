import { Skia } from '@shopify/react-native-skia';
import { useFrameProcessor, useSkiaFrameProcessor } from 'react-native-vision-camera';
import { useResizePlugin } from 'vision-camera-resize-plugin';

import { VisionCameraProxy, Frame } from 'react-native-vision-camera';
import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { Worklets } from 'react-native-worklets-core';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectObjects', {});

interface Result {
  confidence: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
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

export const useObjectDetection = () => {
  const label = useSharedValue('Nothing detected');
  const updateLabel = Worklets.createRunOnJS((prediction: string) => {
    label.set(prediction);
  });

  const frameProcessor = useSkiaFrameProcessor((frame) => {
    'worklet';
    const objects = detectObjects(frame);
    frame.render();

    objects.map((prediction) => {
      if (prediction) {
        const paint = Skia.Paint();
        paint.setColor(Skia.Color('red'));
        paint.setStyle(1);
        paint.setStrokeWidth(10);

        const rect = Skia.XYWHRect(prediction.x, prediction.y, prediction.width, prediction.height);
        frame.drawRect(rect, paint);
        updateLabel(prediction.label);
      }
    });
  }, []);

  return { frameProcessor, label };
};
