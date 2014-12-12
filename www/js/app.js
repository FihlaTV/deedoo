'use strict';

angular.module('deedoo', ['ionic', 'firebase'])

    /*
     * When Mobile Running
     */
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.hide();
                //StatusBar.styleDefault();
            }
        });
    })
    /*
     * CONFIG
     */
    .constant('config', {
        'firebaseUrl'    : 'https://radiant-inferno-550.firebaseio.com/',
        'intro'          : false,
        'user'           : {}
    })

    /*
     * Route System
     */
    .config(function ($stateProvider, $urlRouterProvider, config) {
        $stateProvider
        
            // Menu
            .state('tab', {
                url        : "/tab",
                templateUrl: "templates/tabs.html"
            })

            // Tutorial when we start app for the first time
            .state('tutorial', {
                url  : '/tutorial',
                views: {
                    '': {
                        templateUrl: 'templates/tutorial.html'
                    }
                }
            })

            // Home page with Subscribe & Login
            .state('home', {
                url  : '/home',
                views: {
                    '': {
                        templateUrl: 'templates/home.html'
                    }
                }
            })

            // Connect Page
            .state('connect', {
                url  : '/connect',
                views: {
                    '': {
                        templateUrl: 'templates/connect.html'
                    }
                }
            })

            // Subscribe Page
            .state('subscribe', {
                url  : '/subscribe',
                views: {
                    '': {
                        templateUrl: 'templates/subscribe.html'
                    }
                }
            })

            .state('tab.test', {
                url: '/test',
                views: {
                    'tab-test@tab': {
                        templateUrl: 'templates/tab-test.html'
                    }
                }
            });

        $urlRouterProvider.otherwise((!config.intro) ? '/connect' : '/home');
        
    });