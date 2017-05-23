define(['backbone', 'moment'], function(Backbone, moment) {
    var mainModel = Backbone.Model.extend({
        defaults: {
            userName: "Аноним",
            time: moment().calendar(),
            theme: "<Без темы>",
            comment: ""
        }
    });
    return mainModel;
});