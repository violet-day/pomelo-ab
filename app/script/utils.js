/**
 * Created by Nemo on 15/3/30.
 */

var _ = require('lodash');

exports.genUsers = function (count) {
  count = count || 3000;
  var uids = [];
  _.times(count, function () {
    uids.push(exports._genUid());
  });
  return uids;
};

exports._genUid = function () {
  var seed = 'abcdefghijklmnopqrstuvwxyz',
    id = '';
  _.times(6, function () {
    id += seed.substr(_.random(0, 25), 1);
  });
  return id;
};

exports.writeFileSync('../data/uids.json',exports.genUsers(10000));
