import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './stats.html';


Template.stats.onCreated(function () {
    // this.subscribe('allPayouts');
});

Template.stats.helpers({
    // payouts() {
    //     let currentLimit = Template.instance().collectionLimit.get();
    //     return Payouts.find({}, {sort: {"createdAt": -1}, limit: currentLimit});
    // },
});

Template.stats.events({
    'click #load-more'(event, instance) {
        event.preventDefault();
    },
});