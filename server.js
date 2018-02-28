var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function responder(method, request, response) {

    var allHeaders = request.headers;
    var allBodies = request.body;
    var uniquekey = process.env.UNIQUE_KEY;
    var query = method;

    if (request.headers === null){
        allHeaders = "No headers found";
    }
    if (request.body === null){
        allBodies = "No bodies found";
    }

    response.status(200);
    response.json({message: query, headers: allHeaders, body: allBodies, UNIQUE_KEY: uniquekey});
}

router.use(bodyParser.text({
    type: function(request) {
        return 'text';
    }
}));

router.route('/post')
    .post(function (request, response) {
            responder('posts', request, response);
        }
);

router.route('/get')
    .get(function (request, response) {
           responder('gets', request, response);
        }
);

router.route('/puts')
    .put(function (request, response) {
           responder('puts', request, response);
        }
);

router.route('/delete')
    .post(authController.isAuthenticated,function (request, response) {
        responder('deletes', request, response);
        }
);

router.route('/*')
    .post(function (request, response) {
        response.json({message: "Not valid query!"});
    })

app.use('/', router);
app.listen(process.env.PORT || 8080);