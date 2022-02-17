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
};