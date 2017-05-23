define(['collections/mainCollection', 'models/main', 'views/main', 'underscore', 'backbone', 'jquery'], function(
    mainCollection, mainModel, mainView, _, Backbone, $) {
    var Application = (function() {
            var model = new mainModel();
            var view = new mainView({model: model});

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
                    success: function (data) {
                        if (data) {
                            var v = new mainView({model: data});
                            v.render();
                        }
                    }
                });
            });

            var self = null;

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
                            success: function (data) {
                                var t = JSON.parse(data);
                                _.each(t, function (i) {
                                    var v = new mainView({model: i});
                                    v.render();
                                });
                            }
                        });
                    }

                };
            return module;
    })();
    return Application;
});