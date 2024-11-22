import { Skia } from '@shopify/react-native-skia';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useFrameProcessor, useSkiaFrameProcessor } from 'react-native-vision-camera';
import { useResizePlugin } from 'vision-camera-resize-plugin';

export const useObjectDetection = (modelPath?: string) => {
  const objectDetection = useTensorflowModel(require('@/assets/models/object_detection.tflite'));
  const model = objectDetection.state === 'loaded' ? objectDetection.model : null;

  const { resize } = useResizePlugin();

  //   https://github.com/tensorflow/models/tree/master/research/slim/nets/mobilenet
  const frameProcessor = useSkiaFrameProcessor(
    (frame) => {
      'worklet';
      if (model == null) return;

      const resized = resize(frame, {
        scale: {
          width: 192,
          height: 192,
        },
        pixelFormat: 'rgba',
        dataType: 'uint8',
      });

      const outputs = model?.runSync([resized]);

      const detection_boxes = outputs[0];
      const detection_classes = outputs[1];
      const detection_scores = outputs[2];
      const num_detections = outputs[3];
      console.log(`Detected ${num_detections[0]} objects!`);

      for (let i = 0; i < detection_boxes.length; i += 4) {
        const confidence = detection_scores[i / 4];
        if (confidence > 0.7) {
          // 4. Draw a red box around the detected object!
          const left = Number(detection_boxes[i]);
          const top = Number(detection_boxes[i + 1]);
          const right = Number(detection_boxes[i + 2]);
          const bottom = Number(detection_boxes[i + 3]);

          const paint = Skia.Paint();
          paint.setColor(Skia.Color('red'));
          const rect = Skia.XYWHRect(left, top, right - left, bottom - top);
          frame.drawRect(rect, paint);
        }
      }
    },
    [model],
  );

  return { frameProcessor };
};
