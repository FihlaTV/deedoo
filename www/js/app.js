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
            }
        });
    })
    /*
     * CONFIG
     */
    .constant('config', {
        'firebaseUrl'    : 'https://radiant-inferno-550.firebaseio.com/',
        'user'           : {},
        'logged'         : false,
        'sold'           : 'y47]htAA9)4yS&V'
    })

    /*
     * Route System
     */
    .config(function ($stateProvider, $urlRouterProvider) {
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

            // Connect Page
            .state('connect', {
                url  : '/connect',
                views: {
                    '': {
                        templateUrl: 'templates/connect.html'
                    }
                }
            })

            // New Task (Parent Only)
            .state('newTask', {
                url  : '/newtask',
                views: {
                    '': {
                        templateUrl: 'templates/new_task.html'
                    }
                }
            })

            // Notifications Manipulate (Parent Only)
            .state('notifications', {
                url  : '/notifications',
                views: {
                    '': {
                        templateUrl: 'templates/notifications.html'
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

        $urlRouterProvider.otherwise('tutorial');

    });