/*
 * @Author: qiansc
 * @Date: 2018-04-10 17:02:27
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-09-16 02:44:22
 */
"use strict";

import Stream = require("stream");

export class Transform extends Stream.Transform {
    protected config: TransformConfig;
    /**
     * @param TransformConfig config
     */
    constructor(config?: TransformConfig) {
      super(config);
      this.config = config || {};
    }
}

/**
 * @interface
 */
export interface TransformConfig {

}
