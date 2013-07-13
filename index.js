'use strict'; /*jslint node: true, es5: true, indent: 2 */
var util = require('util');
var osx_notifier = require('osx-notifier');
var winston = require('winston');

var NotificationCenterTransport = function(opts) {
  if (opts === undefined) opts = {};
  opts.debug = opts.debug || false;

  this.name = opts.name || 'notification-center';
  this.title = opts.title || this.name;
  this.level = opts.level || 'info';
  this.group = opts.group;
  this.activate = opts.activate;
  this.open = opts.open;
  this.execute = opts.execute;
};
util.inherits(NotificationCenterTransport, winston.Transport);

NotificationCenterTransport.prototype.log = function (level, message, callback) {
  /**
    @level {string} Level at which to log the message.
    @message {string} Message to log
    @callback {function} Continuation to respond to when complete. */
  var self = this;

  var type = 'pass';
  if (level == 'critical' || level == 'error' || level == 'warn') {
    type = 'fail';
  }
  else if (level == 'debug' || level == 'info') {
    type = 'info';
  }

  var args = {type: type, message: message};
  if (this.group) args.group = this.group;
  if (this.activate) args.activate = this.activate;
  if (this.open) args.open = this.open;
  if (this.execute) args.execute = this.execute;

  osx_notifier(args);
  setImmediate(callback);
};

winston.transports.NotificationCenterTransport = NotificationCenterTransport;
module.exports = NotificationCenterTransport;
