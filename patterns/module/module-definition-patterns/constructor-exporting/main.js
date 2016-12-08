var Logger = require('./logger');

var dbLogger = new Logger('DB');
dbLogger.info('This is an info message');

var accessLogger = new Logger('ACCESS');
accessLogger.verbose('This is an info message');