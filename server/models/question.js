'use strict';

var Mongo = require('mongodb'),
    async = require('async');


function Question(){
}

Object.defineProperty(Question, 'collection', {
  get: function(){return global.mongodb.collection('questions');}
});


Question.all = function(cb){
  Question.collection.find().toArray(cb);
};

Question.findById = function(id,cb){
  console.log(id);
  var _id = Mongo.ObjectID(id.id);
  Question.collection.find({_id:_id}, function(err, obj){
    cb(err, obj);
  });
};

Question.findFormQuestions = function(arrayOfQuestions, cb){
  async.map(arrayOfQuestions, iterator, cb);
};


function iterator(question, cb){
  Question.collection.findOne({_id:question}, function(err, question){
    cb(null, question);
  });
}

module.exports = Question;

