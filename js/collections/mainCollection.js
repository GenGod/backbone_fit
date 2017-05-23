define(['backbone', 'models/main'], function(Backbone, mainModel) {
    var mainCollection = Backbone.Collection.extend({
        model: mainModel
    });
    return mainCollection;
});