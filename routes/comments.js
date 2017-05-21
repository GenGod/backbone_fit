var express = require('express');
var router = express.Router();
var client = require('../startApp');
var _ = require('underscore');
var moment = require('moment');
moment.locale("ru");
var Steppy = require('twostep').Steppy;

router.get('/all', function (request, response) {
    console.log("app.get('/all')");
    Steppy(
        function () {
            client.db.collection("comments").find().toArray(this.slot());
        },
        function (err, result) {
            if (err) {
                console.error("Data not found!");
            } else {
                var data = [];
                _.each(result, function (value) {
                    var date;
                    if (!value.time) {
                        date = "";
                    }
                    else if (+new Date() === value.time) {
                        date = "только что";
                    }
                    else if (+new Date() - value.time < 86400000) {
                        date = moment(value.time).fromNow();
                    } else {
                        date = moment().calendar(value.time, {
                            sameDay: '[Today]',
                            lastDay: '[Yesterday]',
                            lastWeek: '[Last] dddd',
                            sameElse: 'DD.MM.YYYY'
                        });
                    }
                    data.push({
                        userName: value.userName,
                        theme: value.theme,
                        comment: value.comment,
                        time: date
                    });
                });
                response.end(JSON.stringify(data));
            }
        }
    );
});

router.get('/', function (request, response) {
    console.log("app.get('/')");
    response.render('index', {
        title: "Комментарии"
    });
});

router.post('/form', function (request, response) {
    Steppy(
        function () {
            if (!request.body) {
                console.log("Тут оно есть!");
                return response.sendStatus(400);
            }
            var comment = {
                userName: request.body.userName,
                theme: request.body.theme,
                comment: request.body.comment,
                time: +request.body.time
            };
            var conform = require('conform');
            var isComrom = conform.validate(comment, {
                properties: {
                    userName: {
                        type: "string",
                        required: true
                    },
                    theme: {
                        type: "string",
                        required: true
                    },
                    comment: {
                        type: "any",
                        required: true
                    },
                    time: {
                        type: "number",
                        required: true
                    }
                }
            });
            if (isComrom.valid) {
                client.db.collection("comments").insertOne(comment, this.slot());
            }
            else {
                console.dir(isComrom.errors);
            }
            response.end(JSON.stringify({
                userName: request.body.userName,
                theme: request.body.theme,
                comment: request.body.comment,
                time: "только что"
            }));
        },
        function (err, result) {
            if (err)
                return console.log(err);
        }
    );
});

module.exports = router;