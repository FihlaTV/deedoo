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
                StatusBar.show();
            }
            //setTimeout(function() {
            //    navigator.splashscreen.hide();
            //}, 3000);
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

            // Profil
            .state('profil', {
                url  : '/profil',
                views: {
                    '': {
                        templateUrl: 'templates/profil.html'
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

            // Board (Parent Only)
            .state('boardParent', {
                url  : '/boardparent/:idRoom',
                views: {
                    '': {
                        templateUrl: 'templates/board_parent.html'
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

            // Add Custom Notification (Parent Only)
            .state('newNotification', {
                url  : '/newnotification',
                views: {
                    '': {
                        templateUrl: 'templates/new_notification.html'
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

            // Working (Babysitter)
            .state('tab.working', {
                url: '/working/:idRoom',
                views: {
                    'tab-working@tab': {
                        templateUrl: 'templates/tab-working.html'
                    }
                }
            })

            // DODO (Babysitter)
            .state('tab.dodo', {
                url: '/dodo',
                views: {
                    'tab-dodo@tab': {
                        templateUrl: 'templates/tab-dodo.html'
                    }
                }
            })

            // GUARDS (Babysitter)
            .state('tab.guards', {
                url: '/guards',
                views: {
                    'tab-guards@tab': {
                        templateUrl: 'templates/tab-guards.html'
                    }
                }
            })

            // Information Guard
            .state('informationGuard', {
                url  : '/informationguard/:idGuard',
                views: {
                    '': {
                        templateUrl: 'templates/informations_guard.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('tutorial');

    });
