var fs = require('fs');
var path = require('path');
var searchFile = require('./search.js');
var keys = process.argv.slice(4);
var ext = process.argv[3];

var walk = function(dir, done){
  //console.log(dir);
  fs.readdir(dir, function(error, files){
      if(error) return done(error);
      files.forEach(function(file){
        file = path.resolve(dir, file);
        if(!fs.statSync(file).isDirectory()){
          if(searchFile.filter(file, ext)){
            return done(null, file);
          }
        }else{
          walk(file, done);
        }
      });
  });
};

walk(process.argv[2], function(error, filePath){
  if(error){
    console.log(error);
    return;
  }
  searchFile.key(filePath, keys,
        function(error, result){
          if(undefined !== result && result.length > 0){
            console.log('*****' + filePath + '*****');
            for(var line in result){
              console.log('Line ' + line + ' : ' + result[line]);
            }
          }
        }
  );

});
