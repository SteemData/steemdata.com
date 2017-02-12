import {Mongo} from 'meteor/mongo'

Accounts2 = new Mongo.Collection("Accounts");
Posts = new Mongo.Collection("Posts");
Operations = new Mongo.Collection("Operations");
AccountOperations = new Mongo.Collection("AccountOperations");
Settings = new Mongo.Collection("settings");
Statistics = new Mongo.Collection("stats");
PriceHistory = new Mongo.Collection("PriceHistory");

if (Meteor.isServer) {
    Meteor.publish('settings', function () {
        return Settings.find();
    });

    Meteor.publish('statistics', function () {
        return Statistics.find();
    });

    Meteor.publish('tickers', function () {
        return PriceHistory.find({},
            {
                sort: {"timestamp": -1},
                limit: 100
            });
    });
}
