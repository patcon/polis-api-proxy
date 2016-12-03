var argo = require('argo');

argo()
  .use(function(handle) {
    handle('response', function(env, next) {
      env.response.setHeader('Access-Control-Allow-Origin', '*');
      next(env);
    });
  })
  .target('https://api.pol.is')
  .listen(process.env.PORT);
