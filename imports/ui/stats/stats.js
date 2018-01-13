import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './stats.html';


Template.stats.onCreated(function () {
    this.subscribe('_indexer');
    this.subscribe('statistics');
});

Template.stats.helpers({
    indexer() {
        return Indexer.findOne();
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