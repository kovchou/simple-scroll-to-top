var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include : ["*"],
  contentStyleFile: data.url("scroll.css"),
  contentScriptFile : data.url("scroll.js"),
  contentScriptWhen : "ready",
  attachTo : ["existing", "top"]
});