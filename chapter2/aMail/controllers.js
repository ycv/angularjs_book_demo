// Create a module for our core AMail services
var aMailServices = angular.module('AMail', []);



/**
 * 当浏览器URL变为 “/”时，Angular将加载list.html模板，同时用ListController管理这个模板的根元素
 * 当浏览器URL变为 “/view/:id”时，Angular将加载detail.html模板，同时用DetailController管理这个模板的根元素
 * otherwise：如果没有匹配 就走这一段
 */
function emailRouteConfig($routeProvider) {
    $routeProvider.
            when('/', {
                controller: ListController,
                templateUrl: 'list.html'
            }).
// Notice that for the detail view, we specify a parameterized URL component
// by placing a colon in front of the id
            when('/view/:id', {
                controller: DetailController,
                templateUrl: 'detail.html'
            }).
            otherwise({
                redirectTo: '/'
            });
}

// Set up our route so the AMail service can find it
aMailServices.config(emailRouteConfig);

// Some fake emails
messages = [{
        id: 0, sender: 'jean@somecompany.com', subject: 'Hi there, old friend',
        date: 'Dec 7, 2013 12:32:00', recipients: ['greg@somecompany.com'],
        message: 'Hey, we should get together for lunch sometime and catch up.'
                + 'There are many things we should collaborate on this year.'
    }, {
        id: 1, sender: 'maria@somecompany.com',
        subject: 'Where did you leave my laptop?',
        date: 'Dec 7, 2013 8:15:12',
        recipients: ['assssd123', 'asdasd', '安顺市', 'vvv'],
        message: 'I thought you were going to put it in my desk drawer.'
                + 'But it does not seem to be there.'
    }, {
        id: 2, sender: 'bill@somecompany.com', subject: 'Lost python',
        date: 'Dec 6, 2013 20:35:02',
        recipients: ['recipients333333333333.com', '333333333333.com'],
        message: '33333333333message.'
    }];

// Publish our messages for the list template
function ListController($scope) {
    $scope.messages = messages;
}

// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.
function DetailController($scope, $routeParams) {
    $scope.message = messages[$routeParams.id];
}
