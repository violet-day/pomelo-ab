/**
 * Created by Nemo on 15/3/30.
 */
//var redis=require('redis');
//redis.createClient();
var client = require('pomelo-node-client');
var uuid = require('uuid');
var cwd = process.cwd();
//var utils = require(cwd + '/app/script/utils');

//var utils = require('./utils');

var env = require(cwd+'/app/config/env.json').env;
var config = require(cwd+'/app/config/' + env + '/config.json');

var uid = uuid.v4();

var gate = config.gate;
console.log(gate);

client.init({host: gate.host, port: gate.port, log: true}, function (err) {
  //should.not.exist(err);
  client.request('gate.gateHandler.queryEntry', {uid: uid}, function (data) {
    console.log(data);
    client.init({host: data.host, port: data.port, log: true}, function () {
      client.request('connector.entryHandler.enter', {uid: uid}, function (data) {
        if (data.error) {
          console.error(data);
        } else {
          afterLogin(client, data);
        }
      });
    });
  })
});


var afterLogin = function (client) {
  client.on('onMsg', function (msg) {
    //console.log(msg);
  })
};