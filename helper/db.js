const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://rajeshvari:aV2OZDDh8WCz05Ys@moviecluster-shard-00-00.kzx71.mongodb.net:27017,moviecluster-shard-00-01.kzx71.mongodb.net:27017,moviecluster-shard-00-02.kzx71.mongodb.net:27017/movies_api?ssl=true&replicaSet=atlas-s44rgp-shard-0&authSource=admin&retryWrites=true&w=majority');

  mongoose.connection.on('open',()=>{
    console.log('MongoDB Connected');
  });

  mongoose.connection.on('error',(err)=>{
    console.log('MongoDB: Error',err);
  });


  mongoose.Promise = global.Promise;
};
