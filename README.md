# winston-notification-center

A Mac OS X Notification Center transport for [winston](https://github.com/indexzero/winston).

Uses [osx-notifier](https://github.com/chbrown/osx-notifier).

## Usage

    npm install winston winston-notification-center

```js
var winston = require('winston');
var NotificationCenterTransport = require('winston-notification-center');

winston.add(NotificationCenterTransport);

winston.log('Hello world.');
```

## License

Copyright © 2013 Christopher Brown. [MIT Licensed](LICENSE).
