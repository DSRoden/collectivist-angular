'use strict';

var Mongo = require('mongodb');
    //_     = require('underscore-contrib');


function Form(){
}

Object.defineProperty(Form, 'collection', {
  get: function(){return global.mongodb.collection('forms');}
});

Form.create = function(o, cb){
  Form.collection.save(o, cb);
};

Form.all = function(cb){
  Form.collection.find().toArray(cb);
};

Form.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Form.collection.findOne({_id:_id}, function(err, obj){
    cb(null, obj);
  });
};

Form.getFormWithQuestions = function(id, cb){
  console.log(id);
  var _id = Mongo.ObjectID(id.id);
  Form.collection.findOne({_id:_id}, function(err,form){
    require('./question').findFormQuestions(form.questions, function(err, questions){
      cb(null, form, questions);
    });
  });
};


module.exports = Form;
