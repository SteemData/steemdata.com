FlowRouter.route('/', {
    name: 'home',
    action(params, queryParams) {
        BlazeLayout.render('mainLayout', {body: "home"});
    }
});

FlowRouter.route('/stats', {
    name: 'stats',
    action(params, queryParams) {
        BlazeLayout.render('mainLayout', {body: "stats"});
    }
});