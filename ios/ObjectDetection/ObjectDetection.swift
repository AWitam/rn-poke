import MLKit
import VisionCamera

@objc(ObjectDetectionPlugin)
public class ObjectDetectionPlugin: FrameProcessorPlugin {
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    super.init(proxy: proxy, options: options)
  }

  static var DefaultOptions = {
    let options = ImageLabelerOptions()
    options.confidenceThreshold = 0.5
    return options
  }()

  static var labeler = ImageLabeler.imageLabeler(options: DefaultOptions)

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?)
    -> Any?
  {
    let image = VisionImage(buffer: frame.buffer)
    image.orientation = .up

    var objectAttributes: [Any] = []

    do {
      let objects = try ObjectDetectionPlugin.labeler.results(in: image)

      if objects.isEmpty {
        return nil
      }

      if !objects.isEmpty {
        for label in objects {
          objectAttributes.append([
            "confidence": label.confidence,
            "label": label.text,
            "index": label.index,
          ])
        }
      }

    } catch {
      return nil
    }

    return objectAttributes
  }
}
