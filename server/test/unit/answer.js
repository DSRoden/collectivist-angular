/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Answer    = require('../../models/answer'),
    dbConnect = require('../../lib/mongodb'),
    cp        = require('child_process'),
    db        = 'collectivist';

describe('Answer', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Answer object', function(){
      var a = new Answer();
      expect(a).to.be.instanceof(Answer);
    });
  });
  describe('.findByFormId', function(){
    it('should return an answer based on form Id', function(done){
      var id = "f00000000000000000000003";
      Answer.findByFormId(id, function(err, answer){
        expect(answer).to.be.ok;
        expect(answer.responses).to.have.length(3);
        done();
      });
    });
  });
});

