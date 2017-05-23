require.config({
    baseUrl: 'js/library',
    paths: {
        jquery: 'jquery',
        underscore: 'underscore',
        backbone: 'backbone',
        collections: '../collections',
        models: '../models',
        views: '../views'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['jquery', '../main'], function ($, Application) {
    $(document).ready(function() {
        var app = new Application();
        app.init();
    })
});