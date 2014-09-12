'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

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
  Answer.collection.findOne({formId:_id}, cb);
};



module.exports = Answer;

