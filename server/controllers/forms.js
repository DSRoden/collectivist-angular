'use strict';

var Form = require('../models/form');

exports.create = function(req, res){
  Form.create(req.body, function(err, form){
    res.send({form:form});
  });
};

exports.all = function(req, res){
  Form.all(function(err, forms){
    res.send({forms:forms});
  });
};
