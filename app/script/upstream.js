/**
 * Created by Nemo on 15/4/1.
 */
var client = require('pomelo-node-client');
var _ = require('lodash');

var redis = require('redis'),

  env = require('../config/env.json').env,
  config = require('../config/' + env + '/config.json'),
  redisClient = redis.createClient(config.redis);

exports.getRandomUser = function (count, cb) {
  var query = redisClient.multi();
  for (var i = 0; i < count; i++) {
    query = query.randomkey();
  }
  query.exec(function (err, result) {
    if (err)return cb(err);
    cb(null, result.map(function (key) {
      return key.split(':')[2]
    }));
  });
};

var upstream = config.upstream;

client.init({host: upstream.host, port: upstream.clientPort, log: true}, function () {
  var tick = 1;
  setInterval(function () {
    tick++;
    _.times(500, function () {
      exports.getRandomUser(10, function (err, uids) {
        client.request('upstream.upstreamHandler.doRpc', {
          serviceName: 'push',
          methodName: 'pushByUids',
          args: [
            uids,
            'onMsg',
            {
              id: 'ssss',
              content: 'sadfasdf',
              sa: 'sdfsaf',
              sadf: 'sfasfdasdfdasf',
              aaa: 'dasfsadfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfsdfsdafasdfasdfasdfasdfasdfasdfasdfasdf'
            }
          ]
        }, function (result) {
          console.log(result);
        })
      });
    })

  }, 1000);
});
