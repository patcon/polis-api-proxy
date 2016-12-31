var argo = require('argo');
var auth = require('basic-auth');
var cors = require('./cors');

argo()
  .use(cors)
  .target('https://api.pol.is')
  .get('', function(handle) {
    handle('request', function(env, next) {
      var apiKey = env.request.headers['authorization'];
      var username = apiKey;
      var password = '';
      var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
      env.request.headers['authorization'] = auth;
      console.log(env.request);
      next(env);
    });
  })
  .listen(process.env.PORT || 5000);
