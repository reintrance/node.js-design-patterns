require('./patcher');
var logger = require('./logger');

logger.log('This is an info message');

var customLogger = new logger.Logger('CUSTOM');
customLogger.log('This is an info message');

logger.customMessage();
