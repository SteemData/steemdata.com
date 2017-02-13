import {Template} from "meteor/templating";
import "./charts.html";


Template.tickers.onCreated(function () {
    this.subscribe('tickers');
});

Template.tickers.helpers({
    lastPrice() {
        return PriceHistory.findOne({}, {sort: {'timestamp': -1}});
    },
});

Template.tickers.events({
    'click #load-more'(event, instance) {
        event.preventDefault();
    },
});