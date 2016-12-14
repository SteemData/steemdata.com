import {Mongo} from 'meteor/mongo'

Accounts2 = new Mongo.Collection("Accounts");
Posts = new Mongo.Collection("Posts");
Operations = new Mongo.Collection("Operations");
VirtualOperations = new Mongo.Collection("VirtualOperations");
Settings = new Mongo.Collection("settings");

if (Meteor.isServer) {
    Meteor.publish('settings', function () {
        return Settings.find();
    });


    // stats page counters
    Meteor.publish('statsCounters', function() {
        Counts.publish(this, 'accountsCounter', Accounts2.find());
        // Counts.publish(this, 'postsCounter', Posts.find(), { noReady: true });
        // Counts.publish(this, 'operationsCounter', Operations.find());
    });
}
