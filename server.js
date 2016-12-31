var argo = require('argo');

var cors = require('./cors');
var authConversion = require('./auth_conversion');
var pathParameterization = require('./path_parameterization');

argo()
  .use(cors)
  .use(authConversion)
  .use(pathParameterization)
  .target('https://api.pol.is')
  .listen(process.env.PORT || 5000);
