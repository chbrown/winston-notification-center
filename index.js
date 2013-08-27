'use strict'; /*jslint es5: true, node: true, indent: 2 */ /* globals setImmediate */
var util = require('util');
var osx_notifier = require('osx-notifier');
var winston = require('winston');

var NotificationCenterTransport = function(opts) {
  if (opts === undefined) opts = {};

  this.type = opts.type || 'pass';
  this.title = opts.title || 'notification-center';
  this.subtitle = opts.subtitle;
  this.group = opts.group;
  this.activate = opts.activate;
  this.open = opts.open;
  this.execute = opts.execute;
};
util.inherits(NotificationCenterTransport, winston.Transport);

NotificationCenterTransport.prototype.log = function (level, message, meta, callback) {
  /**
    @level {string} Level at which to log the message.
    @message {string} Message to log
    @callback {function} Continuation to respond to when complete. */
  var self = this;

  var type = this.type;
  if (level == 'critical' || level == 'error' || level == 'warn') {
    type = 'fail';
  }
  else if (level == 'debug' || level == 'info') {
    type = 'info';
  }

  var args = {type: type, message: message};
  if (this.title) args.title = this.title;
  if (this.subtitle) args.subtitle = this.subtitle;
  if (this.group) args.group = this.group;
  if (this.activate) args.activate = this.activate;
  if (this.open) args.open = this.open;
  if (this.execute) args.execute = this.execute;

  osx_notifier(args);
  if (callback) {
    setImmediate(callback);
  }
};

// export (monkeypatch) into winston's list of available transports
winston.transports.NotificationCenterTransport = NotificationCenterTransport;
// as well as directly from this package
module.exports = NotificationCenterTransport;
