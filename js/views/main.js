//define(['backbone', 'underscore', 'jquery'], function(Backbone, _, $) {
    var mainView = Backbone.View.extend({
        template: _.template('<div class=row>' +
            '<h4 class="h4"><%= this.model.userName %> <i class="small">' +
            '   <%=this.model.time %></i></h4>' +
            '<h5 class="h5"><b><%= this.model.theme %></b></h5><br/>' +
            '<p class="text-justify"><%= this.model.comment %></p><hr>' +
            '</div>'),
        render: function () {
            $('#comments').prepend(this.template(this.model.toJSON));
            return this;
        }
    });
  //  return mainView;
//});
