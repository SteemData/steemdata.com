FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', {body: "home"});
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