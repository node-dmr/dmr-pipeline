/*
 * @Author: qiansc
 * @Date: 2018-09-15 23:07:54
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-09-16 15:16:09
 */
// import {expect} from 'chai';
import fs = require("fs");
import path = require("path");
import LineTransform from "../src/line";
import * as Transform from "../src/transform";

describe("Extends transform", () =>  {
  it("Empty TransformOptions", () => {
    class T extends Transform.Transform {
      constructor(config?: Transform.TransformOptions) {
        super();
      }
    }
    const t = new T();
  });
});

describe("Line Transform Test", () =>  {
  it("read 5 lines form lines-5.log", () => {
    const reader = fs.createReadStream(path.resolve(__dirname, "./assets/lines-5.txt"));
    let lines = 0;
    const out = reader.pipe(new LineTransform()).on("data", (chunk) => {
      lines ++ ;
      console.log(lines, chunk.toString());
    });

    return new Promise((resolve, reject) => {
      out.on("end", () => {
        if (lines === 5) {
          console.log(`End with ${lines} lines`);
          resolve();
        }
        reject(`error lines : ${lines}`);
      }).on("error", (err) => {
        reject(err);
      });
    });
  });

  it("read complex lines by highWaterMark 4 => 9", () => {
    const reader = fs.createReadStream(path.resolve(__dirname, "./assets/lines-complex.txt"), {
      highWaterMark: 4,
    });
    let lines = 0;
    const out = reader.pipe(new LineTransform({
      lineBreak: "\n",
    })).on("data", (chunk) => {
      lines ++ ;
      console.log(lines, chunk.toString());
    });

    return new Promise((resolve, reject) => {
      out.on("end", () => {
        if (lines === 9) {
          console.log(`End with ${lines} lines`);
          resolve();
        }
        reject(`error lines : ${lines}`);
      }).on("error", (err) => {
        reject(err);
      });
    });
  });
});
