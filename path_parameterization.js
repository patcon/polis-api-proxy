var qs   = require('qs');
var url  = require('url');

module.exports = function(handle) {
  handle('request', function(env, next) {
    var urlObj = url.parse(env.request.url);
    var pathname = urlObj.pathname;
    var urlParts = pathname.split('/');
    var conversation_id = urlParts.pop();
    var obj = qs.stringify({conversation_id: conversation_id});
    urlObj.search = obj;
    urlObj.pathname = urlParts.join('/');
    env.request.url = urlObj.format();
    console.log(env.request.url);
    next(env);
  });
};

