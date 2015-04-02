/**
 * Created by Nemo on 15/4/1.
 */
var client = require('pomelo-node-client');
var _ = require('lodash');

client.init({host: '127.0.0.1', port: 3005}, function () {
  client.request('onlineUser',{}, function () {
    console.log(arguments);
  })


  //setInterval(function () {
  //      _.times(100, function () {
  //    client.notify('upstream.upstreamHandler.pushByUids', {
  //      uids: [],
  //      route: 'onMsg',
  //      message: {
  //        id: 'ssss',
  //        content: 'sadfasdf',
  //        sa: 'sdfsaf',
  //        sadf: 'sfasfdasdfdasf',
  //        aaa: 'dasfsadfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfsdfsdafasdfasdfasdfasdfasdfasdfasdfasdf'
  //      }
  //    });
  //  });
  //}, 1000);
});
