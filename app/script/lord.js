/**
 * Created by Nemo on 15/3/30.
 */

var client = require('pomelo-node-client');
var uuid=require('uuid');
var cwd = process.cwd();
var utils = require(cwd + '/app/script/utils');

//var utils = require('./utils');

var uid=uuid.v4();

var gate={
  host: '127.0.0.1',
    port: 3014,
    queryEntry: 'gate.gateHandler.queryEntry'
};

client.init({host:gate.host,port:gate.port,log:true}, function (err) {
  //should.not.exist(err);
  client.request('gate.gateHandler.queryEntry', {uid: uid}, function (data) {
    console.log(data);
    client.init({host:data.host,port:data.port,log:true}, function () {
      client.request('connector.entryHandler.enter', {uid: uid}, function (data) {
        if (data.error) {
          console.error(data);
        } else {
          //afterLogin(pomelo,data);
        }
      });
    });
  })
});

//
//var afterLogin= function (pomelo) {
//  pomelo.on('onMsg', function (msg) {
//    console.log(msg);
//  })
//};