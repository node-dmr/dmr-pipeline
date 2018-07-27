/*
 * @Author: qiansc 
 * @Date: 2018-04-13 16:36:33 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-07-27 16:02:34
 */
const Transform = require('./transform');

class Connector extends Transform{
    /**
     * @extends {Transform}
     * @classdesc Can connect a ReadableStream and a WritableStream.
     * @constructor
     * @param  {JSON} config
     * @example
     * function getHttpReadableStream(requestParam){
     *  let connector = new Connector();
     *  let req = http.request(requestParam, function(res) {
     *      res.pipe(connector);
     *  });
     *  return connector;
     * }
     * 
     */
    constructor (config) {
        super(config);
    }
    /**
     * @implements
     * @private
     * @param  {Buffer} chunk
     * @param  {String} [encoding]
     * @param  {Function} [callback]
     */
    _transform(chunk, encoding, callback){
        this.push(chunk);
        callback();
    };
}

module.exports = Connector;