// api stuff
import '../imports/api/collections.js'

// layouts
import '../imports/ui/mainLayout/layout.html'

// templates
import '../imports/ui/home/home.js'
import '../imports/ui/stats/stats.js'

// set page metadata
let title = "SteemData";
DocHead.setTitle(title);

let metaInfo = {name: "description", content: "SteemData offers a public database layer for STEEM blockchain."};
DocHead.addMeta(metaInfo);

let metaViewport = {name: "viewport", content: "width=device-width, initial-scale=1", };
DocHead.addMeta(metaViewport);

let linkInfo = {rel: "icon", type: "image/png", href: "/favicon.png"};
DocHead.addLink(linkInfo);