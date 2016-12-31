var qs   = require('qs');
var url  = require('url');

module.exports = function(handle) {
  handle('request', function(env, next) {
    var urlObj = url.parse(env.request.url);
    var pathname = urlObj.pathname;
    var urlParts = pathname.split('/');
    if (urlParts[3] == 'conversations' && urlParts.length > 4) {
      var conversation_id = urlParts.pop();
      var obj = qs.stringify({conversation_id: conversation_id});
      urlObj.search = obj;
      urlObj.pathname = urlParts.join('/');
      env.argo.currentUrl = urlObj.format();
    };
    next(env);
  });
};

