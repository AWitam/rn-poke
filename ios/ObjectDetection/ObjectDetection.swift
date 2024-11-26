import ExpoModulesCore
import MLKit
import VisionCamera
import MLKitObjectDetectionCustom

@objc(ObjectDetectionPlugin)
public class ObjectDetectionPlugin: FrameProcessorPlugin {
  private var options: [AnyHashable: Any]
  private var detector: ObjectDetector

  static func getDefaultOptions() -> ObjectDetectorOptions {
    let options = ObjectDetectorOptions()
    options.shouldEnableClassification = true
    options.shouldEnableMultipleObjects = false
    return options
  }
  
  
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    let defaultOptions = ObjectDetectionPlugin.getDefaultOptions()
    self.detector = ObjectDetector.objectDetector(options: defaultOptions)
    self.options = options
    super.init(proxy: proxy, options: options)
    
    
    let modelOptions = options["model"] as? String
    
    if modelOptions == "mobilenet" {
      guard let modelPath = Bundle.main.path(
        forResource: "mobilenet_v2",
        ofType: "tflite"
      )
      else {
        print("Error getting bundled model")
        return
      }
      let localModel = LocalModel(path: modelPath)
      let customOptions = CustomObjectDetectorOptions(localModel: localModel)
    
      customOptions.detectorMode = .singleImage
      customOptions.shouldEnableClassification = true
      customOptions.classificationConfidenceThreshold = NSNumber(value: 0.5)
      self.detector = ObjectDetector.objectDetector(options: customOptions)
    }
    
  }
  
  
  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?)
  -> Any?
  {
    let image = VisionImage(buffer: frame.buffer)
    image.orientation = .up
    
    var results: [Any] = []
    var objects: [Object]
    do {
      objects = try detector.results(in: image)
    } catch let error {
      print("Failed to detect object with error: \(error.localizedDescription).")
      return nil
    }
    guard !objects.isEmpty else {
            print("Object detector returned no results.")
      return nil
    }
    
    for object in objects {
      let objFrame = object.frame
      
      object.labels.enumerated().forEach { (index, label) in
        return results.append([
          "label": label.text,
          "confidence": label.confidence,
          "x": objFrame.origin.x,
          "y": objFrame.origin.y,
          "width": objFrame.size.width,
          "height": objFrame.size.height,
        ])
      }
      
    }
    
    return results
  }
}
