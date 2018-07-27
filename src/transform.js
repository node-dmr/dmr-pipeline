/*
 * @Author: qiansc 
 * @Date: 2018-04-10 17:02:27 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-07-27 15:49:48
 */
const Stream = require('stream');

class Transform extends Stream.Transform{
    /**
     * @classdesc Base Transform for dmr
     * @extends {Stream.Transform}
     * @constructor
     * @param  {JSON} config
     */
    constructor (config) {
        config = config || {};
        
        super(config);
        this.config = config;

        let self = this;
        
        // function sendHeaders(headers){
        //     self.emit('header', headers);
        // }
        // this.on('pipe', src => {
        //     src.on('header', sendHeaders);
        //     src.on('message', event => {
        //         this.emit('message', event);
        //     });
        // });

        // this.on('unpipe', src => {
        //     self.removeListener('header', sendHeaders);
        // });
        
    }
}

module.exports = Transform;