"use strict";

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
const WM = Cc['@mozilla.org/appshell/window-mediator;1'].
           getService(Ci.nsIWindowMediator);
//Cu.import("resource://gre/modules/Services.jsm");

//mainWindow.gBrowser.addTab(...);


var  dbcloseListener : function(event) {
  if (event.button != 0) {
      return;
  }
  if (event.target.tagName != "tab") {
      return;
  }
  var tab = event.target;
  if(tab && !tab.pinned) { // app tabs won't be closed
    // {animate: true} is actual since Firefox 4
    // that animation is managed via about:config (browser.tabs.animate)
    gBrowser.removeTab(tab, {animate: true});
  }
};


function startup() {
  var window = WM.getMostRecentWindow("navigator:browser");
  var gBrowser = window.gBrowser;

  gBrowser.mTabContainer.addEventListener( 'dblclick', function(event){
      if (event.button != 0) {
          return;
      }
      if (event.target.tagName != "tab") {
          return;
      }
      var tab = event.target;
      if(tab && !tab.pinned) { // app tabs won't be closed
        // {animate: true} is actual since Firefox 4
        // that animation is managed via about:config (browser.tabs.animate)
        gBrowser.removeTab(tab, {animate: true});
      }
  }, false );



  
}
function shutdown() {
  var window = WM.getMostRecentWindow("navigator:browser");
  var gBrowser = window.gBrowser;
  gBrowser.mTabContainer.removeEventListener( 'dblclick', dbcloseListener, false );
}
