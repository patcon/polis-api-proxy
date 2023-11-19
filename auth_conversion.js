module.exports = function(handle) {
  handle('request', function(env, next) {
    var apiKey = env.request.headers['authorization'];
    var username = apiKey;
    var password = '';
    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
    env.request.headers['authorization'] = auth;

    // Fake a user-agent to get around cloudflare blocking.
    // TODO: Extract into own export.
    env.request.headers['user-agent'] = 'foo';

    next(env);
  });
};

