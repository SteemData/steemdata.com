Meteor.methods({
    'getMarkdown'(markdownFile) {
        return Assets.getText(markdownFile);
    }
});