/*
 * @Author: qiansc
 * @Date: 2018-04-13 16:36:33
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-09-15 23:26:09
 */
import {Transform, TransformCallback, TransformOptions} from "./transform";
/**
 * @interface
 * @param string line-break
 */
export interface LineTransformOptions extends TransformOptions {
  "line-break"?: string;
}

  /**
   * @param LineTransformCondig config
   * @param string config["line-break"] Default: \n
   * @example
   *
   * fileStream.pipe(new LineTransform())
   *  .on('data', line => console.log(line));
   */
export default class LineTransform extends Transform {
    private prevBuffer = new Buffer(0);
    private breaker: string;

    constructor(config: LineTransformOptions = {}) {
        super(config);
        this.breaker = config["line-break"] || "\n";
    }
    public _transform(buffer: Buffer, encoding: string, callback: () => void) {
        const breaker = this.breaker;
        let from = 0;
        let to: number = 0;
        while ((to = buffer.indexOf(breaker, from)) >= 0) {
            let lineBuffer = buffer.slice(from, to);
            if (this.prevBuffer.length) {
                // 前次chunk，存在剩余buffer进行拼接
                lineBuffer = Buffer.concat([this.prevBuffer, lineBuffer], to - from + this.prevBuffer.length);
                this.prevBuffer = new Buffer(0);
            }
            this.push(lineBuffer);
            from = to + breaker.length;
        }
        if (from < buffer.length) {
            // 剩余buffer留用
            this.prevBuffer = Buffer.concat([this.prevBuffer, buffer.slice(from, buffer.length)],
                buffer.length - from + this.prevBuffer.length);
        }
        callback();
    }
    public _flush(callback: TransformCallback) {
        if (this.prevBuffer.length > 0) {
          this.push(this.prevBuffer);
        }
        this.prevBuffer = new Buffer(0);
        callback();
    }
}
