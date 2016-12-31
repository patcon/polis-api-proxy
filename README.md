# Pol.is API Proxy

This app proxies API calls in order to experiment with alternative API
design choices.

These alternatives include:

* CORS support as required by [Swagger dynamic docs][swagger-cors].
* Token authentication (ie headers) rather than BasicAuth.
  * Before: `curl https://api.pol.is/api/v3/conversations?conversation_id=5mnfxu85hx -u xxxxxxxx:`
  * After: `curl https://api.pol.is/api/v3/conversations?conversation_id=5mnfxu85hx -H Authorization:xxxxxxxx`
* Primary resource ID in path param rather than query param.
  * Before: `curl https://api.pol.is/api/v3/conversations?conversation_id=5mnfxu85hx -H Authorization:xxxxxxxx`
  * After: `curl https://api.pol.is/api/v3/conversations/5mnfxu85hx -H Authorization:xxxxxxxx`
* Sub-resource rather than top-level resources.
  * Before: `curl https://api.pol.is/api/v3/participants?conversation_id=5mnfxu85hx -H Authorization:xxxxxxxx`
  * After: `curl https://api.pol.is/api/v3/conversations/5mnfxu85hx/participants -H Authorization:xxxxxxxx`

   [swagger-cors]: https://github.com/swagger-api/swagger-ui/blob/master/README.md#cors-support
