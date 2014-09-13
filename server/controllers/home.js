'use strict';

var Form = require('../models/form');

exports.index = function(req, res){
  Form.all(function(err, forms){
    res.send({forms:forms});
  });
};

exports.form = function(req, res){
  Form.getFormWithQuestions(req.body, function(err, form, questions){
    console.log(form);
    console.log(questions);
    res.send({form:form, questions:questions});
  });
};
