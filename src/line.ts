/*
 * @Author: qiansc
 * @Date: 2018-04-13 16:36:33
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-09-15 23:26:09
 */
import {Transform, TransformConfig} from './transform';
/**
 * @interface
 * @param string line-break
 */
export interface LineTransformCondig extends TransformConfig {
  'line-break': string
}

/**
 * @param LineTransformCondig config
 * @param string config.line-break
 */
export default class LineTransform extends Transform{
    private prevBuffer = new Buffer(0);
    private breaker: string;

    constructor (config: LineTransformCondig = {'line-break': '\n'}) {
        super(config);
        this.breaker = config['line-break'];
    }
    _transform(buffer:Buffer, encoding:string, callback: Function){
        let breaker = this.breaker;
        let from = 0,
            to = 0;
        while((to = buffer.indexOf(breaker, from)) >= 0) {
            var lineBuffer = buffer.slice(from, to);
            if (this.prevBuffer.length) {
                // 前次chunk，存在剩余buffer进行拼接
                var lineBuffer = Buffer.concat([this.prevBuffer, lineBuffer],to - from + this.prevBuffer.length);
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
    };
    _flush(callback: Function){
        if (this.prevBuffer) {
            if (this.prevBuffer.length > 0){
                this.push(this.prevBuffer);
            }
            this.prevBuffer = new Buffer(0);
        }
        callback();
    }
}
