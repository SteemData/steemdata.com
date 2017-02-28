Template.registerHelper('steemsportsTitle', function(string) {
    let core = string.split(":")[1];
    return core.split('-')[0];
});

Template.registerHelper('steemTx', function(string) {
    return "https://steemd.com/tx/"+string;
});

Template.registerHelper('steemImg', function(img_url) {
    return "https://img1.steemit.com/72x72/"+img_url;
});

Template.registerHelper('scProfilePic', function(username) {
    return "https://img.steemconnect.com/@"+username+"?s=72";
});

Template.registerHelper('number', function(string) {
    return numeral(string).format('0,0');
});

Template.registerHelper('postPermlink', function(string) {
    return string.split("/")[1];
});

Template.registerHelper('decimal', function(num, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
});

Template.registerHelper('round', function(num, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
});

Template.registerHelper('upper', function(string) {
    return string.toUpperCase();
});

Template.registerHelper('humanDate', function(string) {
    return moment(string).format("dddd, MMMM Do YYYY");
});

Template.registerHelper('sheetDate', function(string) {
    return moment(string).utc().format("MMM Do h:mm A");
});

Template.registerHelper('timeToNow', function(string) {
    return moment().to(string);
});

Template.registerHelper('timeFromNow', function(string) {
    return moment().from(string);
});


let timeTick = new Tracker.Dependency();
Meteor.setInterval(function () {
    timeTick.changed();
}, 1000);

fromNowReactive = function (mmt) {
    timeTick.depend();
    return mmt.fromNow();
};

toNowReactive = function (mmt) {
    timeTick.depend();
    return mmt.toNow();
};

Template.registerHelper('timeFromNowReactive', function(string) {
    return fromNowReactive(moment(string));
});

Template.registerHelper('timeToNowReactive', function(string) {
    return toNowReactive(moment(string));
});

Template.registerHelper('getMarkdown', (markdownFile) => {
    // if there is first no empty line in markdownFile
    // meteor's markdown helper renders <h1> as <pre>
    return '\n' + ReactiveMethod.call('getMarkdown', markdownFile);
});