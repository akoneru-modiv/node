var fs = require('fs');
var pModule = require('path');
var keys = [];


module.exports = {
  key : function(path, searchKeys, callback){
    keys = searchKeys;
    fs.readFile(path, function(error, fileContent){
        var result = [];
        var i = 0;
        if(error){
          return callback(error);
        }
        fileContent.toString().split('\n').forEach(function(line){
          findKeysInLine(++i, line, result);
        });
        return callback(null, result);
    });
  },
  filter : function(path, ext){
    if(ext === '.')
      return true;
    return (pModule.extname(path) === ext);
  }
};

function findKeysInLine(index, line, result){
  keys.forEach(function(key){
    if(line.toLowerCase().search(key.toLowerCase()) >= 0){
      result[index] = line;
    }
  });
}
