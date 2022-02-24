function unauthorize(res){
  res.statusCode = 401;
  res.end();
}

module.exports = {
  unauthorize
}