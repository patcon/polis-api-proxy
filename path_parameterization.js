var qs   = require('qs');
var url  = require('url');

module.exports = function(handle) {
  handle('request', function(env, next) {
    var urlObj = url.parse(env.request.url);
    var pathname = urlObj.pathname;
    var urlParts = pathname.split('/');
    if (urlParts[3] == 'conversations' && urlParts.length > 4) {
      var conversation_id = urlParts.splice(4, 1)[0];
      if (urlParts.length > 4) {
        // remove 'conversations' part from path
        urlParts.splice(3, 1);
      };
      qsOrig = qs.parse(urlObj.query);
      qsNew = { conversation_id: conversation_id };
      var queryString = qs.stringify(Object.assign(qsOrig, qsNew));
      urlObj.search = queryString;
      urlObj.pathname = urlParts.join('/');
      env.argo.currentUrl = urlObj.format();
    };
    next(env);
  });
};

