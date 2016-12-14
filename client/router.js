FlowRouter.route('/', {
    name: 'home',
    action(params, queryParams) {
        BlazeLayout.render('mainLayout', {body: "home"});
    }
});