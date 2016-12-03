var argo = require('argo');

argo()
  .use(function(handle) {
    handle('response', function(env, next) {
      env.response.setHeader('Access-Control-Allow-Origin', '*');
      next(env);
    });
    handle('request', function(env, next) {
      env.request.headers['Referer'] = '';
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
