var argo = require('argo');

argo()
  .use(function(handle) {
    handle('response', function(env, next) {
      env.response.setHeader('Access-Control-Allow-Origin', '*');
      env.response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      env.response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
      next(env);
    });
    handle('request', function(env, next) {
      env.request.headers['Referer'] = '';
      env.request.headers['Origin'] = 'https://api.pol.is';
      console.log(env.request.headers);
      next(env);
    });
    handle('error', function(env, error, next) {
      console.log(error.message);
      next(env);
      process.exit();
    });
  })
  .target('https://api.pol.is')
  .listen(process.env.PORT);
