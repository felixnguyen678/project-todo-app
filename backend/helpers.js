const url = require("url");
exports.handleError = function handleError(
  error,
  filePath = '',
  functionName = ''
){
  console.error(`${filePath} -> ${functionName} -> Error:`, error)
}

exports.headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Max-Age": 2592000, // 30 days
  /** add other headers as per requirement */
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.convert2RoutePathname = function (pathname) {
  const path = pathname.slice(1).split('/');
  switch (path[0]){
    case '': return '/';
    case 'sign-in': return '/sign-in';
    case 'sign-up': return '/sign-up';
    case 'ping-with-auth': return '/ping-with-auth';
    case 'tasks':
      if(!path[1]) return '/tasks';
      switch (path[2]){
        case undefined: return '/tasks/{id}';
        case 'update': return '/tasks/{id}/update';
        case 'delete': return '/tasks/{id}/delete';
      }
    case 'projects':
      if(!path[1]) return '/projects';
      switch (path[2]){
        case undefined: return '/projects/{id}';
        case 'update': return '/projects/{id}/update';
        case 'delete': return '/projects/{id}/delete';
      }
    case 'users':
      if(!path[1]) return '/users';
      switch (path[2]){
        case undefined: return '/users/{username}';
        case 'update': return '/users/{username}/update';
        case 'delete': return '/users/{username}/delete';
      }

  }

}

exports.getPathnameArrayFromRequest = function(request) {
  const parsedUrl = url.parse(request.url, true);
  const path = parsedUrl.pathname.slice(1).split('/');
  return path;
}

exports.getQueryParams = function(request) {
  const parsedUrl = url.parse(request.url, true);
  return parsedUrl.query;
}