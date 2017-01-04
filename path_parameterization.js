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
      console.log(env.request.method);
      qsNew = { conversation_id: conversation_id };
      switch (env.request.method) {
        case 'GET':
          qsOrig = qs.parse(urlObj.query);
          var queryString = qs.stringify(Object.assign(qsOrig, qsNew));
          urlObj.search = queryString;
          break;
        case 'POST':
          var body = [];
          env.request.on('data', function(chunk) {
            body.push(chunk);
          }).on('end', function() {
            body = Buffer.concat(body).toString();
            var data = JSON.parse(body);
            data = Object.assign(data, qsNew);
            data = JSON.stringify(data);
            env.request.body = data;
            console.log(data);
          }).pause();
          break;
      };
      urlObj.pathname = urlParts.join('/');
      env.argo.currentUrl = urlObj.format();
      console.log(env.argo.currentUrl);
    };
    next(env);
  });
};

