var qs   = require('qs');
var url  = require('url');

module.exports = function(handle) {
  handle('request', function(env, next) {
    var _req = env.request;
    var urlObj = url.parse(_req.url, true);
    var urlParts = urlObj.pathname.split('/');
    var [resource, convoId, subresource] = urlParts.splice(3);
    if (resource == 'conversations' && convoId) {
      if (subresource) resource = subresource;
      urlParts.push(resource);
      urlObj.pathname = urlParts.join('/');

      if (convoId) {
        var convoParam = { conversation_id: convoId };
        console.log(_req.method);
        switch (_req.method) {
          case 'GET':
          case 'HEAD':
            var newQuery = Object.assign(urlObj.query, convoParam);
            urlObj.search = qs.stringify(newQuery);
            env.argo.currentUrl = urlObj.format();
            console.log(env.argo.currentUrl);
            next(env);
            break;
          default:
            var body = [];
            var _req = env.request;
            _req.on('data', function(chunk) {
              body.push(chunk);
            }).on('end', function() {
              body = Buffer.concat(body).toString();
              body = JSON.parse(body);
              body = Object.assign(body, convoParam);
              body = JSON.stringify(body);
              env.request.body = body;
              env.request.headers['Content-Length'] = Buffer.byteLength(body);
              env.argo.currentUrl = urlObj.format();
              console.log(body);
              console.log(env.argo.currentUrl);
              next(env)
            });
        };
      };
    } else {
      // POST /conversations
      console.log(env.argo.currentUrl);
      next(env);
    };
  });
};

