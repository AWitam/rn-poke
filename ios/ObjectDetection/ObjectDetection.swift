import MLKit
import VisionCamera
import ExpoModulesCore

@objc(ObjectDetectionPlugin)
public class ObjectDetectionPlugin: FrameProcessorPlugin {
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    super.init(proxy: proxy, options: options)
  }
  
  static var DefaultOptions = {
    let options = ObjectDetectorOptions()
    options.shouldEnableClassification = true
    options.shouldEnableMultipleObjects = true
    return options
  }()
  
  static var detector = ObjectDetector.objectDetector(options: DefaultOptions)
  
  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?)
  -> Any?
  {
    let image = VisionImage(buffer: frame.buffer)
    image.orientation = .up
    
    var results: [Any] = []
    var objects: [Object]
    do {
      objects = try ObjectDetectionPlugin.detector.results(in: image)
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
      let trackingID = object.trackingID
      
      
      object.labels.enumerated().forEach { (index, label) in
        return results.append([
          "label": label.text,
          "confidence": label.confidence,
          "x":objFrame.origin.x,
          "y": objFrame.origin.y,
          "width": objFrame.size.width,
          "height": objFrame.size.height
        ])
      }
      
    }
    
    return results
  }
}
