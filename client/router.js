FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', {body: "home"});
    }
});


FlowRouter.route('/guide', {
    name: 'guide',
    action() {
        BlazeLayout.render('mainLayout', {body: "guide"});
    }
});

FlowRouter.route('/api', {
    name: 'api',
    action() {
        BlazeLayout.render('mainLayout', {body: "api"});
    }
});

FlowRouter.route('/stats', {
    name: 'stats',
    action() {
        BlazeLayout.render('mainLayout', {body: "stats"});
    }
});

FlowRouter.route('/tickers', {
    name: 'tickers',
    action() {
        BlazeLayout.render('mainLayout', {body: "tickers"});
    }
});


FlowRouter.route('/charts', {
    name: 'charts',
    action() {
        BlazeLayout.render('mainLayout', {body: "charts"});
    }
});

FlowRouter.route('/sbds', {
    name: 'sbds',
    action() {
        BlazeLayout.render('mainLayout', {body: "sbds"});
    }
});