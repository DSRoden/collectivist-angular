'use strict';

var Mongo = require('mongodb'),
    async = require('async');


function Question(){
}

Object.defineProperty(Question, 'collection', {
  get: function(){return global.mongodb.collection('questions');}
});

Question.create = function(question, cb){
  Question.collection.save(question,function(err, question){
    require('./form').findById(question.formId, function(err, form){
      form.questions.push(question._id);
      require('./form').collection.update({_id:form._id},{$set:{questions:form.questions}}, cb);
    });
  });
};



Question.all = function(cb){
  Question.collection.find().toArray(cb);
};

Question.findById = function(id,cb){
  console.log(id);
  var _id = Mongo.ObjectID(id);
  Question.collection.findOne({_id:_id}, function(err, obj){
    cb(err, obj);
  });
};

Question.findFormQuestions = function(arrayOfQuestions, cb){
  async.map(arrayOfQuestions, iterator, cb);
};



module.exports = Question;



function iterator(question, cb){
  Question.collection.findOne({_id:question}, function(err, question){
    cb(null, question);
  });
}

