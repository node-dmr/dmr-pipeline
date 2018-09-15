/*
 * @Author: qiansc
 * @Date: 2018-09-15 23:07:54
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-09-16 00:01:29
 */
import {expect} from 'chai';
import fs = require('fs');
import path = require('path');
import LineTransform from '../src/line';


describe("Copy File By Using SourceFile", () =>{
  it('read 5 lines form lines-5.log',() => {
    let reader = fs.createReadStream(path.resolve(__dirname, './assets/lines-5.log'));
    let lines = 0;
    let out = reader.pipe(new LineTransform()).on('data', chunk => {
      lines ++ ;
      console.log(chunk);
    });
    return new Promise((resolve, reject) => {
      out.on('end', () => {
        console.log(`End with ${lines} lines`);
        resolve();
      }).on('error', err => {
        reject(err);
      });;
    });
  })
});
