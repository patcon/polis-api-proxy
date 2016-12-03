var argo = require('argo');

argo()
  .use(function(handle) {
    handle('response', function(env, next) {
      env.response.setHeader('Access-Control-Allow-Origin', '*');
      env.response.setHeader('Referer', '');
      next(env);
    });
    handle('error', function(env, error, next) {
      console.log(error.message);
    });
  })
  .target('https://api.pol.is')
  .listen(process.env.PORT);
