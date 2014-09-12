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
  //var numQs =
};


module.exports = Answer;

