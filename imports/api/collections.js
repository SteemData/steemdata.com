import {Mongo} from 'meteor/mongo'

Accounts2 = new Mongo.Collection("Accounts");
Posts = new Mongo.Collection("Posts");
Operations = new Mongo.Collection("Operations");
AccountOperations = new Mongo.Collection("AccountOperations");
Indexer = new Mongo.Collection("_indexer");
Statistics = new Mongo.Collection("stats");
PriceHistory = new Mongo.Collection("PriceHistory");

if (Meteor.isServer) {
    Meteor.publish('_indexer', function () {
        return Indexer.find();
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
