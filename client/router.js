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

FlowRouter.route('/prices', {
    name: 'prices',
    action() {
        BlazeLayout.render('mainLayout', {body: "tickers"});
    }
});