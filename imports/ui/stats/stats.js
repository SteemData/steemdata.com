import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './stats.html';


Template.stats.onCreated(function () {
    this.subscribe('settings');
    this.subscribe('statistics');
});

Template.stats.helpers({
    lastBlock() {
        let settings = Settings.findOne();
        return settings ? settings['last_block'] : 0;
    },
    stats() {
        return Statistics.findOne();
    }
});

Template.stats.events({
    'click #load-more'(event, instance) {
        event.preventDefault();
    },
});