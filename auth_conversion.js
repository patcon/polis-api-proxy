module.exports = function(handle) {
  handle('request', function(env, next) {
    var apiKey = env.request.headers['authorization'];
    console.log(apiKey);
    var username = apiKey;
    var password = '';
    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
    env.request.headers['authorization'] = auth;
    next(env);
  });
};

