define(['backbone', 'underscore', 'jquery', 'text!templates/mainView.html'], function(Backbone, _, $, Template) {
    var mainView = Backbone.View.extend({
        template: _.template(Template),
        render: function () {
            $('#comments').prepend(this.template(this.model.toJSON));
            return this;
        }
    });
    return mainView;
});
