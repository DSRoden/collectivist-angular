'use strict';

var  Mongo  = require('mongodb'),
     _      = require('underscore-contrib');

function Answer(){
}

Object.defineProperty(Answer, 'collection', {
  get: function(){return global.mongodb.collection('answers');}
});

// find answers by form id
//
// syncScore

Answer.findByFormId = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Answer.collection.findOne({formId:_id}, function(err, obj){
    var answer = Object.create(Answer.prototype);
    answer = _.extend(answer, obj);
    cb(err, answer);
  });
};

Answer.prototype.syncScore = function(){
  //first make an array of avg respnonses
  //then make array of arrays of syncScores
  var numQs = this.responses[0].length;
  var numUsers = this.responses.length;
  var avgVals = [];
  var sum = 0;

  for(var i = 0; i < numQs; i++){
    this.responses.forEach(function(user){
      sum += user[i].value;
    });
      avgVals.push(sum/numUsers);
      sum = 0;
  }

  //now we have array of avg VAls
  //console.log(avgVals);

  var syncScores = this.responses.map(function(user){
    user = user.map(function(q){
      //console.log(q.prediction);
      //console.log(_.indexOf(user, q));
      //console.log(avgVals[_.indexOf(q, user)]);
      q = (q.prediction - avgVals[_.indexOf(user, q)]);
      return q;
    });
    return user;
  });

  console.log(syncScores);
  return syncScores;

};


module.exports = Answer;

