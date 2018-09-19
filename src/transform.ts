/*
 * @Author: qiansc
 * @Date: 2018-04-10 17:02:27
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-09-16 20:58:52
 */
import Stream = require("stream");

export class Transform extends Stream.Transform {
    protected options: TransformOptions;
    /**
     * @param TransformConfig config
     */
    constructor(options?: TransformOptions) {
      super(options);
      this.options = options || {};
    }
}

/**
 * @interface
 */
export interface TransformOptions extends Stream.TransformOptions {

}

export type TransformCallback = (error?: Error, data?: any) => void;
