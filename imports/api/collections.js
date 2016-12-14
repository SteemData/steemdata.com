import {Mongo} from 'meteor/mongo'

Accounts2 = new Mongo.Collection("Accounts");
Posts = new Mongo.Collection("Posts");
Operations = new Mongo.Collection("Operations");
VirtualOperations = new Mongo.Collection("VirtualOperations");
Settings = new Mongo.Collection("settings");

if (Meteor.isServer) {

}
