#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if __has_include("rnpoke/rnpoke-Swift.h")
#import "rnpoke/rnpoke-Swift.h"
#else
#import "rnpoke-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(ObjectDetectionPlugin, detectObjects)