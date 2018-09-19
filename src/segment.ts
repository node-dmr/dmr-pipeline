/*
 * @Author: qiansc
 * @Date: 2018-09-16 20:57:59
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-09-16 21:00:27
 */
import {Transform, TransformCallback, TransformOptions} from "./transform";
/**
 * @interface
 */
export interface SegmentTransformOptions extends TransformOptions {

}

export default class SegmentTransform extends Transform {
  constructor(options: SegmentTransformOptions) {
    super(options);
  }
}
