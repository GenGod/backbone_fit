define(['collections/mainCollection', 'models/main', 'views/main', 'underscore', 'backbone', 'jquery'], function(
    mainCollection, mainModel, mainView, _, Backbone, $) {
    var Application = (function() {

            $('form').submit(function (e) {
                e.preventDefault();
                //Парсинг полей формы
                var registerForm = document.forms["commentsForm"];
                var userName = registerForm.elements["userName"].value;
                var theme = registerForm.elements["theme"].value;
                var comment = registerForm.elements["comment"].value;
                var time = Date.now().toString();

                //AJAX-запрос, передающий данные формы на сервер
                $.ajax({
                    type: "POST",
                    url: "/form",
                    data: JSON.stringify({
                        userName: registerForm.elements["userName"].value,
                        theme: registerForm.elements["theme"].value,
                        time: time,
                        comment: registerForm.elements["comment"].value
                    }),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (commentData) {
                        if (commentData) {
                            var view = new mainView({model: commentData});
                            view.render();
                        }
                    }
                });
            });

            var self;

            var module = function() {
                self = this;
            };

            module.prototype =
                {
                    constructor: module,

                    init: function() {
                        self.initViews();
                    },

                    initViews: function() {
                        $.ajax({
                            type: 'get',
                            url: '/all',
                            success: function (commentData) {
                                var comments = JSON.parse(commentData);
                                _.each(comments, function (comment) {
                                    var view = new mainView({model: comment});
                                    view.render();
                                });
                            }
                        });
                    }

                };
            return module;
    })();
    return Application;
});