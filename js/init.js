require.config({
    baseUrl: 'js/library',
    paths: {
        underscore: 'library/underscore',
        jquery: 'library/jquery',
        backbone: 'library/backbone',
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

require(['library/jquery', 'main'], function ($, Application) {
    $(document).ready(function() {
        var app = new Application();
        app.start();
    })
});