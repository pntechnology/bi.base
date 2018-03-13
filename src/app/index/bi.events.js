angular
  .module('bi.base')
  .constant('BIEvents', {
    UNAUTHORIZED: 'BI.EVENTS.AUTH.UNAUTHORIZED',
    AUTHORIZED: 'BI.EVENTS.AUTH.AUTHORIZED',
    ERROR: 'BI.EVENTS.ERROR',
    VERSION: 'BI.EVENTS.VERSION',
    LOAD: 'BI.EVENTS.LOAD',
    MAINTENANCE: 'BI.EVENTS.MAINTENENCE',
    FORBIDDEN: 'FORBIDDEN'
  });
