/*
 * @Author: qiansc 
 * @Date: 2018-07-27 16:03:38 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-07-27 18:17:09
 */
const assert = require('assert');
const expect = require('chai').expect;
const Connector = require('../src/index').connector;
// const Stream = require('stream');

// class duplex

it('Connector Test', function() {
  let connector = new Connector();
  connector.write(new Buffer('hello'));
  connector.on('data', buffer => {
    expect(buffer.toString()).to.be.equal('hello');
  });
  connector.end();
});

// const TestServer = require('./util/test-server');
// const http = require('http');
// const TestConfig = {port: 8099 , content: 'hello dmr\nsuccess', timeOut: 2000};

// it('TestServer Start', function() {
//   TestServer.start(TestConfig);
// });

// it('Connector Test With HttpRequest', function() {
//   let connector = new Connector();
//   let req = http.request({
//     "host": "localhost",
//     "path": "/",
//     "port": "8099"
//   }, function(res) {
//     res.pipe(connector);
//   });
//   let content = "";
//   connector.on('data', function(chunk){
//     content += chunk.toString();
//   });
//   req.end();
//   return new Promise((resolve, reject) => {
//     connector.on('end', function(){
//       if (content === TestConfig.content) {
//         console.log('response is same:\n', content);
//         resolve();
//       } else {
//         console.log('response is different:\n', content);
//         reject();
//       }
//       TestServer.stop();
//     });
//   });
// });