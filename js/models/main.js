define(['backbone'], function(Backbone) {
    var mainModel = Backbone.Model.extend({
        defaults: {
            userName: "Аноним",
            time: +new Date().toDateString(),
            theme: "<Без темы>",
            comment: ""
        }
    });
    return mainModel;
});