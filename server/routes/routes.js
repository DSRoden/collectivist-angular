'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    questions      = require('../controllers/questions'),
    forms          = require('../controllers/forms'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/form', home.form);
  app.post('/questions', questions.create);
  app.get('/questions', questions.all);
  app.post('/forms', forms.create);
  app.get('/forms', forms.all);

  console.log('Express: Routes Loaded');
};

